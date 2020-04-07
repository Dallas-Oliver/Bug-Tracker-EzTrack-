const router = require("express").Router();
const Project = require("../models/Project");
const jwt = require("jsonwebtoken");

router.post("/save-project", (req, res) => {
  const body = req.body;

  const project = new Project({
    name: body.name,
    _id: body.uid,
    dateCreated: body.dateCreated,
    numberOfTickets: body.numberOfTickets,
    projectDescription: body.projectDescription,
    Tickets: body.Tickets,
    assignedUsers: body.assignedUsers,
    status: body.status,
    dueDate: body.dueDate
  });

  project
    .save()
    .then(data => {
      res
        .status(200)
        .send({ message: "project saved", projectName: data.name });
    })
    .catch(err => {
      if (err) {
        res.status(400).send({ message: "project not saved", error: err });
      }
    });
});

router.get("/all-projects", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    res.status(400).send("Invald token");
  } else {
    try {
      jwt.verify(token, process.env.JWT_KEY, err => {
        if (err) {
          res.status(400).send("Invalid token");
        }
        Project.find()
          .exec()
          .then(projects => {
            res.status(200).send({ projects });
          });
      });
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  }
});

router.get("/project", (req, res) => {});

module.exports = router;
