const { Router } = require("express");
const projectRouter = Router();
const verifyToken = require("../middlewares/verifyToken.js");

const {
  fetchProjectBugs,
  fetchProjectDetails,
  createProjectBug,
  createProject,
} = require("../controllers/projectController.js");

projectRouter.post("/", verifyToken, createProject);
projectRouter.get("/:projectId", verifyToken, fetchProjectDetails);

projectRouter.get("/:projectId/bugs", verifyToken, fetchProjectBugs);
projectRouter.post("/:projectId/bugs", verifyToken, createProjectBug);

module.exports = projectRouter;
