const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const { PrismaClient } = require("../generated/prisma/client.js");
const { parse } = require("path/posix");
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
    const results = validationResult(req);

    if (results.isEmpty()) {
      if (!user) {
        res.status(401).json({ msg: "Incorrect username or password" });
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
    } else {
      const errorMessages = results.errors.map(
        (error) => new Object({ msg: error.msg }),
      );
      res.status(422).json(errorMessages);
    }
  })(req, res, next);
};

const signupPost = async (req, res) => {
  const { username, password, email } = req.body;

  const results = validationResult(req);

  if (results.isEmpty()) {
    const userInDb = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: username,
            },
          },
          {
            email: {
              equals: email,
            },
          },
        ],
      },
    });

    if (userInDb) {
      res
        .status(403)
        .json({ message: "a user with those credentials already exists." });
    } else {
      const user = await prisma.user.create({
        data: {
          username,
          password: await bcrypt.hash(password, 10),
          email,
        },
      });
      res.sendStatus(200);
    }
  } else {
    const errorMessages = results.errors.map(
      (error) => new Object({ msg: error.msg }),
    );
    res.status(422).json(errorMessages);
  }
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const resetPasswordRequest = async (req, res) => {
  const results = validationResult(req);

  if (results.isEmpty()) {
    const isEmailInDb = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = await bcrypt.hash(resetToken, 10);

    if (isEmailInDb) {
      const passwordResetTokenExists = await prisma.passwordToken.findUnique({
        where: {
          userId: isEmailInDb.id,
        },
      });
      if (passwordResetTokenExists) {
        await prisma.passwordToken.delete({
          where: {
            id: passwordResetTokenExists.id,
          },
        });
        await prisma.passwordToken.create({
          data: {
            userId: isEmailInDb.id,
            token: hashedResetToken,
          },
        });
      } else {
        await prisma.passwordToken.create({
          data: {
            userId: isEmailInDb.id,
            token: hashedResetToken,
          },
        });
      }
      const link = `${process.env.FRONTEND_URL}/passwordReset?token=${resetToken}&id=${isEmailInDb.id}`;
      const mailOptions = {
        from: process.env.EMAIL,
        to: isEmailInDb.email,
        subject: "Bugberus - Password Reset Request",
        html: `<h1>Forgot your password?</h1> <p> A request to have your password for Bugberus was received. If this was you, please click <a href="${link}">${link}</a>.... otherwise, ignore it!</p>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.sendStatus(500);
        } else {
          res.end();
        }
      });
    }
    res.end();
  } else {
    const errorMessages = results.errors.map(
      (error) => new Object({ msg: error.msg }),
    );
    res.status(422).json(errorMessages);
  }
};

const resetPasswordCheck = async (req, res) => {
  // when user clicks link to reset password, handle the logic sent out in this controller
  const passwordResetToken = await prisma.passwordToken.findUnique({
    where: {
      userId: parseInt(req.body.userId),
    },
  });
  if (!passwordResetToken) {
    // send that password is invalid or has expired
    return res.sendStatus(401);
  }
  const isValid = await bcrypt.compare(
    req.body.token,
    passwordResetToken.token,
  );
  if (!isValid) {
    // send that password is invalid or has expired
    return res.sendStatus(401);
  }
  const hash = await bcrypt.hash(req.body.password, 10);
  await prisma.user.update({
    where: {
      id: parseInt(req.body.userId),
    },
    data: {
      password: hash,
      modifiedAt: new Date(),
    },
  });
  res.end();
};

module.exports = {
  loginPost,
  signupPost,
  resetPasswordRequest,
  resetPasswordCheck,
};
