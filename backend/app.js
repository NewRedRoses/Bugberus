const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// Router
const authRouter = require("./routes/authRouter.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRouter);

app.listen(PORT, () => console.log(`Launched on port: ${PORT}`));
