const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const { updateProjectModifyTime } = require("../helpers/project.js");

const fetchBug = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const userId = parseInt(authData.user.id);
      const bugId = parseInt(req.params.bugId);

      const bug = await prisma.bug.findFirst({
        where: {
          id: bugId,
        },
        select: {
          id: true,
          name: true,
          projectId: true,
          createdAt: true,
          project: {
            select: {
              ownerId: true,
            },
          },
        },
      });
      if (userId == bug.project.ownerId) {
        res.json(bug);
      } else {
        res.sendStatus(403);
      }
    }
  });
};

const renameBug = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const bugId = parseInt(req.params.bugId);
      const { name } = req.body;
      const results = validationResult(req);

      if (results.isEmpty()) {
        if (Number.isInteger(bugId)) {
          const renamedBug = await prisma.bug.update({
            where: {
              id: bugId,
            },
            data: {
              name,
              modifiedAt: new Date(),
            },
          });
          updateProjectModifyTime(renamedBug.projectId);
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      } else {
        const errorMessages = results.errors.map(
          (error) => new Object({ msg: error.msg }),
        );

        res.status(422).json(errorMessages);
      }
    }
  });
};

const deleteBug = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const bugId = parseInt(req.params.bugId);

      if (Number.isInteger(bugId)) {
        const bug = await prisma.bug.findFirst({
          where: {
            id: bugId,
          },
          select: {
            project: {
              select: {
                id: true,
                ownerId: true,
              },
            },
          },
        });

        if (bug.project.ownerId == authData.user.id) {
          const bugToDelete = await prisma.bug.update({
            where: {
              id: bugId,
            },
            data: {
              deletedAt: new Date(),
            },
            select: {
              id: true,
            },
          });
          updateProjectModifyTime(bug.project.id);
          res.json(bugToDelete);
        } else {
          res.sendStatus(403);
        }
      } else {
        res.sendStatus(500);
      }
    }
  });
};

const changeBugStatus = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const bugId = parseInt(req.params.bugId);
      const { status } = req.body;

      if (Number.isInteger(bugId)) {
        const bug = await prisma.bug.findFirst({
          where: {
            id: bugId,
          },
          select: {
            project: {
              select: {
                id: true,
                ownerId: true,
              },
            },
          },
        });

        if (bug.project.ownerId == authData.user.id) {
          const updatedBug = await prisma.bug.update({
            where: {
              id: bugId,
            },
            data: {
              status,
              modifiedAt: new Date(),
            },
          });
          updateProjectModifyTime(bug.project.id);
          res.sendStatus(200);
        } else {
          res.sendStatus(403);
        }
      } else {
        res.sendStatus(500);
      }
    }
  });
};

// TODO: Optimize these controller functions to handle UPDATE in one alone

const updateBugDescription = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const bugId = parseInt(req.params.bugId);
      const { description } = req.body;

      if (Number.isInteger(bugId)) {
        const bug = await prisma.bug.findFirst({
          where: {
            id: bugId,
          },
          select: {
            project: {
              select: {
                id: true,
                ownerId: true,
              },
            },
          },
        });

        if (bug.project.ownerId == authData.user.id) {
          const updatedBug = await prisma.bug.update({
            where: {
              id: bugId,
            },
            data: {
              description,
              modifiedAt: new Date(),
            },
          });
          updateProjectModifyTime(bug.project.id);
          res.sendStatus(200);
        } else {
          res.sendStatus(403);
        }
      } else {
        res.sendStatus(500);
      }
    }
  });
};

const updateBugDifficulty = (req, res) => {
  jwt.verify(req.token, process.env.SECRET, async (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const bugId = parseInt(req.params.bugId);
      const { difficulty } = req.body;

      if (Number.isInteger(bugId)) {
        const bug = await prisma.bug.findFirst({
          where: {
            id: bugId,
          },
          select: {
            project: {
              select: {
                id: true,
                ownerId: true,
              },
            },
          },
        });

        if (bug.project.ownerId == authData.user.id) {
          const updatedBug = await prisma.bug.update({
            where: {
              id: bugId,
            },
            data: {
              difficulty,
              modifiedAt: new Date(),
            },
          });
          updateProjectModifyTime(bug.project.id);
          res.sendStatus(200);
        } else {
          res.sendStatus(403);
        }
      } else {
        res.sendStatus(500);
      }
    }
  });
};

module.exports = {
  fetchBug,
  renameBug,
  deleteBug,
  changeBugStatus,
  updateBugDescription,
  updateBugDifficulty,
};
