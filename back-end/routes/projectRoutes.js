const router = require("express").Router();
const Project = require("../models/Project");
const Ticket = require("../models/Ticket");
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
    dueDate: body.dueDate,
  });

  project
    .save()
    .then((project) => {
      res.status(200).send({ message: "project saved", project });
    })
    .catch((err) => {
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
      jwt.verify(token, process.env.JWT_KEY, (err) => {
        if (err) {
          res.status(400).send("Invalid token");
        }
        Project.find()
          .exec()
          .then((projects) => {
            res.status(200).send({ projects });
          });
      });
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  }
});

router.get("/get-project/:projectId", (req, res) => {
  const projectId = req.params.projectId;

  if (!projectId) {
    res.status(400).send({ message: "Bad request" });
  } else {
    Project.findOne({ _id: projectId })
      .exec()
      .then((project) => {
        res.status(200).send(project);
      })
      .catch((err) => {
        res.status(400).send({ message: "No matching project" });
      });
  }
});

router.post("/save-ticket/:projectId", (req, res) => {
  const projectId = req.params.projectId;

  const body = req.body;

  if (!projectId) {
    res.status(400).send({ message: "Bad request" });
  } else {
    Project.findOne({ _id: projectId })
      .exec()
      .then((project) => {
        const ticket = new Ticket({
          name: body.name,
          _id: body.uid,
          dateCreated: body.dateCreated,
          ticketDescription: body.description,
          projectId: projectId,
          priority: body.priority,
          status: body.status,
        });

        project.Tickets.push(ticket);

        project.save().then((err) => {
          if (err) {
            res.status(400).send({ message: "ticket not sent!" });
          } else {
            res.status(200).send({ message: "ticket saved!", project });
          }
        });
      });
  }
});

module.exports = router;
