const { Router } = require("express");

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("This is a test.");
});

module.exports = authRouter;
