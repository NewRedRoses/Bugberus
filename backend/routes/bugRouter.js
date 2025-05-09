const { Router } = require("express");
const bugRouter = Router();

const { fetchBug } = require("../controllers/bugController.js");

const verifyToken = require("../middlewares/verifyToken.js");

bugRouter.get("/:bugId", verifyToken, fetchBug);

module.exports = bugRouter;
