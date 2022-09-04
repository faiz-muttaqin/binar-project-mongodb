const express = require("express");
const routes = express();
const userControllers = require("../controllers/userControllers");

//page render
routes.get("/", userControllers.index);
routes.get("/games", userControllers.games);
routes.get("/login", userControllers.loginPage);
routes.get("/room", userControllers.roomPage);
routes.get("/register", userControllers.registerPage);

//API
routes.post("/users", userControllers.register);
routes.get("/users", userControllers.admin);
routes.get("/api/users", userControllers.admindata);
routes.get("/users/:id", userControllers.edit);
routes.get("/api/users/:id", userControllers.getUserById);
routes.put("/users/:id", userControllers.update);
routes.delete("/users/:id", userControllers.delete);

routes.get("/userprofile/:id", userControllers.userprofile);
routes.post("/login", userControllers.loginAuth);
routes.post("/games/:id", userControllers.gamesResult);

module.exports = routes;
