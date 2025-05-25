const { body, query, validationResult } = require("express-validator");
const { Router } = require("express");

const authRouter = Router();

const { loginPost, signupPost } = require("../controllers/authController.js");

// username, password, email are the body fields
const validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty.")
    .isLength({ min: 1, max: 20 })
    .withMessage("Username must be shorter than 20 characters."),
  body("password").trim().notEmpty().withMessage("Password cannot be empty."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isLength({ min: 3, max: 255 })
    .withMessage("Email must be at least 4 characters but less than 255. ")
    .isEmail()
    .withMessage("Please ensure proper email formatting (e.g me@me.com)"),
];

const validateLogin = [
  body("username").trim().notEmpty().withMessage("Username cannot be empty."),
  body("password").trim().notEmpty().withMessage("Password cannot be empty."),
];

authRouter.post("/login", validateLogin, loginPost);

authRouter.post("/signup", validateSignup, signupPost);

module.exports = authRouter;
