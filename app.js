const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Routers
const authRouter = require("./routes/authRouter.js");

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Express running on port: ${PORT}`));
