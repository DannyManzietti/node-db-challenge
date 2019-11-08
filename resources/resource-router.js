const express = require("express");

const Resources = require("./resource-model");

const router = express.Router();

router.get("/", (req, res) => {
  Resources.getResources()
    .then(resources => res.status(200).json(resources))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get resources" });
    });
});

router.post("/", (req, res) => {
  Resources.addResource(req.body)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to create new resource" });
    });
});

module.exports = router;
