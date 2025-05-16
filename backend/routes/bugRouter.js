const { Router } = require("express");
const bugRouter = Router();

const { fetchBug, renameBug } = require("../controllers/bugController.js");

const verifyToken = require("../middlewares/verifyToken.js");

bugRouter.get("/:bugId", verifyToken, fetchBug);
bugRouter.patch("/:bugId", verifyToken, renameBug);

module.exports = bugRouter;
