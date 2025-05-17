const { Router } = require("express");
const bugRouter = Router();

const {
  fetchBug,
  renameBug,
  deleteBug,
  changeBugStatus,
} = require("../controllers/bugController.js");

const verifyToken = require("../middlewares/verifyToken.js");

bugRouter.get("/:bugId", verifyToken, fetchBug);
bugRouter.delete("/:bugId", verifyToken, deleteBug);

bugRouter.patch("/:bugId/rename", verifyToken, renameBug);
bugRouter.patch("/:bugId/status", verifyToken, changeBugStatus);

module.exports = bugRouter;
