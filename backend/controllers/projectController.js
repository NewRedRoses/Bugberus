const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

const fetchProjectDetails = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const projectId = parseInt(req.params.projectId);

      if (Number.isInteger(projectId)) {
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
      } else {
        res.sendStatus(400);
      }
    }
  });
};

const createProject = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const { name } = req.body;

      try {
        await prisma.project.create({
          data: {
            name: name,
            ownerId: authData.user.id,
          },
        });
        res.sendStatus(200);
      } catch (err) {
        res.sendStatus(500);
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

      if (Number.isInteger(projectId)) {
        const bugs = await prisma.bug.findMany({
          where: {
            projectId,
          },
        });
        res.json(bugs);
      } else {
        res.sendStatus(400);
      }
    }
  });
};

const createProjectBug = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const projectId = parseInt(req.params.projectId);

      if (Number.isInteger(projectId)) {
        const { name, description } = req.body;

        const newBug = await prisma.bug.create({
          data: {
            name,
            description,
            projectId,
          },
        });
        if (newBug) {
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      } else {
        res.sendStatus(400);
      }
    }
  });
};

module.exports = {
  fetchProjectDetails,
  createProject,
  fetchProjectBugs,
  createProjectBug,
};
