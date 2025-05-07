const { Router } = require("express");

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("hello, user");
});

module.exports = userRouter;
