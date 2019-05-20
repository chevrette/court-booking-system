const express = require("express"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  router = require("./router");

const app = express();
const port = 4000;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
router.initRoutes(app);

const server = app.listen(port, () => {
  console.log("Server started");
});
