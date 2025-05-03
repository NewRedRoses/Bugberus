const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Router
const authRouter = require("./routes/authRouter.js");

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Launched on port: ${PORT}`));
