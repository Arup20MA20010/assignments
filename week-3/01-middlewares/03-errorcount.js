// const request = require("supertest");
// const assert = require("assert");
const express = require("express");

const app = express();
let errorCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

const errorMiddleware = (err, req, res, next) => {
  console.log("Error Called", err);
  errorCount++;
  console.log("errorCount", errorCount);
  res.status(404).json({ msg: "Not found", errorCount: errorCount });
};

app.get("/user", function (req, res) {
  console.log("HIT");
  console.dir(Error);
  res.status(200).json({ name: "john" });
  throw new Error("User not found");
  // res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.get("/errorCount", function (req, res) {
  res.status(200).json({ errorCount });
});

const port = 3000;
console.log("Fuck");
app.use(errorMiddleware);
app.listen(port, () => {
  console.log("server started on ", port);
});
module.exports = app;
