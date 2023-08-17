const { express, routes } = require("./controller");
const path = require("path");
const port = +process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const { errorHandling } = require("./middleware/ErrorHandling");
const cookieParser = require("cookie-parser");


app.use(express.static("./static"),
  express.urlencoded({ extended: false }),
  cookieParser(),
  cors(),
  routes
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Request-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});

routes.get("^/$|/challenger", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./static/html/index.html"));
});

app.listen(port, () => {
  console.log(`You are listening on port ${port}`);
});
