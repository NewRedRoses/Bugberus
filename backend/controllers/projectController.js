const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

const fetchProjectDetails = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const projectId = parseInt(req.params.projectId);
      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
        },
      });
      if (project) {
        res.json(project);
      } else {
        res.sendStatus(404);
      }
    }
  });
};

const fetchProjectBugs = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const projectId = parseInt(req.params.projectId);

      const bugs = await prisma.bug.findMany({
        where: {
          projectId,
        },
      });
      res.json(bugs);
    }
  });
};

module.exports = { fetchProjectDetails, fetchProjectBugs };
