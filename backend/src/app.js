const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth.routes"));
app.use("/projects", require("./routes/project.routes"));
app.use("/tasks", require("./routes/task.routes"));

module.exports = app;
