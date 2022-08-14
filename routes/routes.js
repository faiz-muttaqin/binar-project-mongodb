const express = require("express");
const routes = express();
const userControllers = require("../controllers//userControllers");

routes.get("/", userControllers.index);
routes.get("/games", userControllers.games);
routes.get("/login", userControllers.loginPage);
routes.get("/room", userControllers.roomPage);

// routes.get("/signup", userControllers.signupPage);
routes.get("/admin", userControllers.admin);
routes.post("/login", userControllers.loginAuth);
// routes.post("/signup", userControllers.signupSend);
routes.get("/admin/:id", userControllers.delete);
routes.get("/register", userControllers.registerPage);
routes.post("/register", userControllers.register);

routes.get("/edituser/:id", userControllers.edit);
routes.post("/edituser/:id", userControllers.update);

routes.get("/userprofile/:id", userControllers.userprofile);
routes.post("/games/:id", userControllers.gamesResult);
// routes.post("/edituser", userControllers.update);

module.exports = routes;
