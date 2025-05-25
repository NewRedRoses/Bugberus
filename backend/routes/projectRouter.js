const { body } = require("express-validator");
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

const validateProjectName = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name cannot be empty.")
    .isLength({ min: 1, max: 50 })
    .withMessage("Project name have more than 2 but less than 50 characters."),
  ,
];

const validateProjectBug = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Bug must have a name!")
    .isLength({ min: 1, max: 50 })
    .withMessage("Bug name must have at least one character but less than 50."),
  body("description").optional(),
];

projectRouter.post("/", verifyToken, validateProjectName, createProject);

projectRouter.get("/:projectId", verifyToken, fetchProjectDetails);
projectRouter.patch(
  "/:projectId",
  verifyToken,
  validateProjectName,
  renameProject,
);
projectRouter.delete("/:projectId", verifyToken, deleteProject);

projectRouter.get("/:projectId/bugs", verifyToken, fetchProjectBugs);
projectRouter.post(
  "/:projectId/bugs",
  verifyToken,
  validateProjectBug,
  createProjectBug,
);

module.exports = projectRouter;
