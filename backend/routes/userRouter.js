const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken.js");

const userRouter = Router();

const {
  fetchUserData,
  fetchUserProjects,
} = require("../controllers/userController.js");

userRouter.get("/", verifyToken, fetchUserData);
userRouter.get("/projects", verifyToken, fetchUserProjects);

module.exports = userRouter;
