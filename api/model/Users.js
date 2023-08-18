const db = require("../config");
const { hash, compare, hashSync } = require("bcrypt");
const { createToken } = require("../middleware/AuthenticateUser");
class Users {
  fetchUsers(req, res) {
    const query = `
        SELECT userID, firstName, lastName, gender, emailAdd, profileUrl FROM Users
    `;
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results,
      });
    });
  }
  fetchUser(req, res) {
    const query = `
        SELECT userID, firstName, lastName, gender, emailAdd, profileUrl FROM Users WHERE userID = ${req.params.id}
    `;
    db.query(query, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        result,
      });
    });
  }
  async login(req, res) {
    const { emailAdd, userPass } = req.body;
    // query
    const query = `
      SELECT firstName, lastName,
       gender, userDOB, emailAdd,
        userPass, profileUrl FROM
         Users WHERE emailAdd = ?
    `;

    db.query(query, [emailAdd], async (err, result) => {
      if (err) throw err;
      if (!result?.length) {
        res.json({
          status: res.statusCode,
          msg: "You are providing the wrong email",
        });
      } else {
        await compare(userPass, result[0].userPass, (cerr, cresult) => {
          if (cerr) throw cerr;
          // Create a token
          const token = createToken({
            emailAdd,
            userPass,
          });
          // Save A token
          if (cresult) {
            res.json({
              msg: "Logged in!",
              token,
              cresult: cresult[0],
            });
          } else {
            res.json({
              status: res.statusCode,
              msg: "Invalid login",
            });
          }
        });
      }
    });
  }
  async register(req, res) {
    const data = req.body;
    // Encrypt password
    data.userPass = await hash(data.userPass, 15);
    // Payload
    const user = {
      emailAdd: data.emailAdd,
      userPass: data.userPass,
    };

    const query = `
      INSERT INTO Users SET ?
    `;

    db.query(query, [data], (err) => {
      if (err) throw err;
      // Create token
      let token = createToken(user);

      res.json({
        status: res.statusCode,
        token,
        msg: "User registered successfully!",
      });
    });
  }
  deleteUser(req, res) {
    const query = `
        DELETE FROM Users WHERE userID = ${req.params.id}
    `;

    db.query(query, [req.params.id], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "User record was deleted successfully",
      });
    });
  }
  updateUser(req, res) {
    const data = req.body;
    if (data.userPass) {
      data.userPass = hashSync(data.userpass, 15);
    }
    const query = `
        UPDATE Users SET ? where userID = ?
    `;
    db.query(query, [data, req.params.id], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "User details were updated successfully",
      });
    });
  }
}

module.exports = Users;
