const { Router } = require("express");
const projectRouter = Router();

projectRouter.get("/", (req, res) => {
  res.send("project");
});

module.exports = projectRouter;
