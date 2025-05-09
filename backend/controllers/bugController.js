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

module.exports = { fetchBug };
