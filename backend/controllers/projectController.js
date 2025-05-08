const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

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

module.exports = { fetchProjectBugs };
