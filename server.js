const express = require("express");
const helmet = require("helmet");

const ProjectRouter = require("./projects/project-router");
const ResourceRouter = require("./resources/resource-router");
const TaskRouter = require("./tasks/task-router");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/projects", ProjectRouter);
server.use("/api/resources", ResourceRouter);
server.use("/api/tasks", TaskRouter);

server.get("/", (req, res) => res.send("<h1>Hello World!</h1>"));

module.exports = server;
