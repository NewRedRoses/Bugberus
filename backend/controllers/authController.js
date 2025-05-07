const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = prisma.user.findFirst({
      where: {
        id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const loginPost = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).json({ failure: "Incorrect username or password" });
    } else {
      jwt.sign(
        { user: user },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 },
        (err, token) => {
          res.json({ token });
        },
      );
    }
  })(req, res, next);
};

const signupPost = async (req, res) => {
  const { username, password, email } = req.body;

  // TODO: Implement actual validation and sanitization

  if (username != "" && password != "" && email != "") {
    try {
      const user = await prisma.user.create({
        data: {
          username,
          password: await bcrypt.hash(password, 10),
          email,
        },
      });
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(404);
    }
  } else {
    console.log("one of the items is empty");
  }
};

module.exports = { loginPost, signupPost };
