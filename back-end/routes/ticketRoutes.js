const router = require("express").Router();
const Project = require("../models/Project");
const jwt = require("jsonwebtoken");

router.get("project/:projectId/ticket/:ticketId", (req, res) => {
  console.log(req.params);
});

//`projects/project/${projectId}/ticket/${ticketId}`

module.exports = router;
