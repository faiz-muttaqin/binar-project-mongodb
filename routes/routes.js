const express = require("express");
const Routes = express();
const dataUser = require("../user_log/user_log.js");

Routes.get("/", function (req, res) {
  res.render("index");
});

Routes.get("/games", function (req, res) {
  res.render("games");
});

Routes.get("/tester", function (req, res) {
  res.render("tester");
});

Routes.get("/login", (req, res) => {
  res.render("login");
});

Routes.post("/login", (req, res) => {
  let requestData = req.body;
  let newUser = requestData.username;
  let newPass = requestData.password;
  let filteredResult1 = dataUser.find(
    (o) => newUser === o.user && newPass === o.pass
  );

  if (filteredResult1) {
    res.send({
      message: "sucessfull to login",
      resultData: filteredResult1,
      statusCode: 200,
      fase: true,
    });
  } else {
    res.send({
      message: "failed to login, wrong username/password",
      fase: false,
    });
  }
});

module.exports = Routes;
