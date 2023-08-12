const db = require("../config");
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
  login(req, res) {}
  register(req, res) {
    const query = `
        INSERT INTO Users ?;
    `;

    db.query(query, [req.body], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "User registered successfully",
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
    const query = `
        UPDATE Users SET ? where userID = ${req.params.id}
    `;

    db.query(query, [req.body, req.params.id], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "User details were updated successfully",
      });
    });
  }
  alterUser(req, res) {}
}

module.exports = { Users };