const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

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
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
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
          });
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

module.exports = { fetchBug, renameBug, deleteBug, changeBugStatus };
