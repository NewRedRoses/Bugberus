const { PrismaClient } = require("../generated/prisma/client.js");
const prisma = new PrismaClient();

const updateProjectModifyTime = async (
  projectId,
  timeModified = new Date(),
) => {
  const project = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      modifiedAt: timeModified,
    },
  });
};

module.exports = { updateProjectModifyTime };
