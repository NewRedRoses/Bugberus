const { Router } = require("express");

const authRouter = Router();

const { loginPost, signupPost } = require("../controllers/authController.js");

authRouter.post("/login", loginPost);

authRouter.post("/signup", signupPost);

module.exports = authRouter;
