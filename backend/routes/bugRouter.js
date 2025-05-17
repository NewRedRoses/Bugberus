const { Router } = require("express");
const bugRouter = Router();

const {
  fetchBug,
  renameBug,
  deleteBug,
} = require("../controllers/bugController.js");

const verifyToken = require("../middlewares/verifyToken.js");

bugRouter.get("/:bugId", verifyToken, fetchBug);
bugRouter.patch("/:bugId/rename", verifyToken, renameBug);
bugRouter.delete("/:bugId", verifyToken, deleteBug);

module.exports = bugRouter;
