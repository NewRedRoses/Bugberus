const jwt = require("jsonwebtoken");

const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

const fetchUserData = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const user = await prisma.user.findFirst({
        where: {
          id: authData.id,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
      res.json(user);
    }
  });
};

const fetchUserProjects = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const projects = await prisma.project.findMany({
        where: {
          ownerId: authData.user.id,
          deletedAt: {
            equals: null,
          },
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          _count: {
            select: {
              bugs: true,
            },
          },
        },
      });
      res.json(projects);
    }
  });
};

module.exports = { fetchUserData, fetchUserProjects };
