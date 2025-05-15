const { Router } = require("express");
const projectRouter = Router();
const verifyToken = require("../middlewares/verifyToken.js");

const {
  fetchProjectBugs,
  fetchProjectDetails,
  createProjectBug,
  createProject,
  deleteProject,
  renameProject,
} = require("../controllers/projectController.js");

projectRouter.post("/", verifyToken, createProject);
projectRouter.get("/:projectId", verifyToken, fetchProjectDetails);
projectRouter.patch("/:projectId", verifyToken, renameProject);
projectRouter.delete("/:projectId", verifyToken, deleteProject);

projectRouter.get("/:projectId/bugs", verifyToken, fetchProjectBugs);
projectRouter.post("/:projectId/bugs", verifyToken, createProjectBug);

module.exports = projectRouter;
