const { Router } = require("express");
const bugRouter = Router();

bugRouter.get("/", (req, res) => {
  res.send("buggy");
});

module.exports = bugRouter;
