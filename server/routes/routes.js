const express = require("express");
const routes = express();
const userControllers = require("../controllers/userControllers");

//page render
routes.get("/", userControllers.index);
routes.get("/games", userControllers.games);
routes.get("/login", userControllers.loginPage);
routes.get("/room", userControllers.roomPage);
routes.get("/register", userControllers.registerPage);
routes.get("/edituser/:id", userControllers.edit);
routes.get("/userprofile/:id", userControllers.userprofile);

//API
routes.get("/users", userControllers.admin);
routes.post("/users", userControllers.register);
routes.put("/users/:id", userControllers.update);
routes.delete("/users/:id", userControllers.delete);

routes.post("/login", userControllers.loginAuth);
routes.post("/games/:id", userControllers.gamesResult);

module.exports = routes;
