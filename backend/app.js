const express = require("express");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
const authRouter = require("./routes/authRouter.js");
const userRouter = require("./routes/userRouter.js");
const bugRouter = require("./routes/bugRouter.js");
const projectRouter = require("./routes/projectRouter.js");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/bug", bugRouter);
app.use("/project", projectRouter);

app.listen(PORT, () => console.log(`Launched on port: ${PORT}`));
