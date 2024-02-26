var createError = require("http-errors");
var express = require("express");
var path = require("path");
const nunjucks = require("nunjucks");
var cookieParser = require("cookie-parser");
const cors = require("cors");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/generatePythonCode");

var app = express();
app.use(cors());

nunjucks.configure(".", {
  autoescape: true,
  express: app,
});

app.set("template", path.join(__dirname, "template"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.post("/generate-python-file", (req, res) => {
  // console.log("req.body.values.useStory", JSON.stringify(req.body.values));

  const templatePath = req.body.values.useStory
    ? "/template/testStoreCase.njk"
    : "/template/testCase.njk";
  const pythonCode = nunjucks.render(
    path.join(__dirname, templatePath),
    req.body.values.content
  );

  console.log('pythonCode', pythonCode);

  return res.json({
    code: pythonCode,
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
