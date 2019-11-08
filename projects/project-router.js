const express = require("express");

const Projects = require("./project-model");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.getProjects()
    .then(projects => {
      const updatedProjects = projects.map(project => {
        if (project.completed === 0) {
          project.completed = false;
        } else if (project.completed === 1) {
          project.completed = true;
        }
        return project;
      });
      res.status(200).json(updatedProjects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get projects" });
    });
});

router.get("/:id/tasks", (req, res) => {
  Projects.getProjectTasks(req.params.id)
    .then(tasks => {
      if (tasks.length) {
        const updatedTasks = tasks.map(task => {
          if (task.completed === 0) {
            task.completed = false;
          } else if (task.completed === 1) {
            task.completed = true;
          }
          return task;
        });
        res.status(200).json(updatedTasks);
      } else {
        res
          .status(404)
          .json({ message: "Could not find tasks for given project" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get tasks" });
    });
});

router.get("/:id/resources", (req, res) => {
  Projects.getProjectResources(req.params.id)
    .then(resources => {
      if (resources.length) {
        res.status(200).json(resources);
      } else {
        res
          .status(404)
          .json({ message: "Could not find resources for given project" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get resources" });
    });
});

router.get("/:id", (req, res) => {
  Projects.getProjectById(req.params.id)
    .then(project => {
      if (project) {
        const updatedProject = {
          ...project,
          completed: project.completed === 1 ? true : false,
        };
        res.status(200).json(updatedProject);
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get project" });
    });
});

router.post("/", (req, res) => {
  const newProj = { ...req.body, completed: 0 };
  Projects.addProject(newProj)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to create new project" });
    });
});

router.post("/:id/addTask", (req, res) => {
  Projects.getProjectById(req.params.id)
    .then(project => {
      if (project) {
        const newTask = { ...req.body, completed: 0 };
        Projects.addTask(newTask, req.params.id).then(task => {
          res.status(201).json(task);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not fine project with given ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to create new task" });
    });
});

module.exports = router;
