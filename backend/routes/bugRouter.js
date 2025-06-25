const { Router } = require("express");
const { body } = require("express-validator");

const bugRouter = Router();

const {
  fetchBug,
  renameBug,
  deleteBug,
  changeBugStatus,
  updateBugDescription,
  updateBugDifficulty,
} = require("../controllers/bugController.js");

const verifyToken = require("../middlewares/verifyToken.js");

const validateBugName = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Bug's name cannot be empty.")
    .isLength({ min: 1, max: 50 })
    .withMessage(
      "Bug's name must be longer than one character but less than 50.",
    ),
];

bugRouter.get("/:bugId", verifyToken, fetchBug);
bugRouter.delete("/:bugId", verifyToken, deleteBug);

bugRouter.patch("/:bugId/rename", verifyToken, validateBugName, renameBug);
bugRouter.patch("/:bugId/status", verifyToken, changeBugStatus);
bugRouter.patch("/:bugId/description", verifyToken, updateBugDescription);
bugRouter.patch("/:bugId/difficulty", verifyToken, updateBugDifficulty);

module.exports = bugRouter;
