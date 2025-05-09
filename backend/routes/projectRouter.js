const { Router } = require("express");
const projectRouter = Router();
const verifyToken = require("../middlewares/verifyToken.js");

const {
  fetchProjectBugs,
  fetchProjectDetails,
} = require("../controllers/projectController.js");

projectRouter.get("/:projectId", verifyToken, fetchProjectDetails);
projectRouter.get("/:projectId/bugs", verifyToken, fetchProjectBugs);

module.exports = projectRouter;
