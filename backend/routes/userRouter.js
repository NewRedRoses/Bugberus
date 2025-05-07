const { Router } = require("express");
const verifyToken = require("../middlewares/verifyToken.js");

const userRouter = Router();

userRouter.get("/", verifyToken, (req, res) => {
  res.send("hello, user");
});

module.exports = userRouter;
