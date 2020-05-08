const router = require("express").Router();
const Project = require("../models/Project");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/save-project", (req, res) => {
  const body = req.body.newProject;

  const project = new Project({
    name: body.name,
    _id: body.uid,
    dateCreated: body.dateCreated,
    createdBy: req.body.currentUser.name,
    numberOfTickets: body.numberOfTickets,
    projectDescription: body.projectDescription,
    assignedUsers: req.body.currentUser,
    status: body.status,
    dueDate: body.dueDate,
  });

  User.findOne({ _id: req.body.currentUser._id })
    .exec()
    .then((user) => {
      user.projectIds.push(project._id);
      user.save().then(() => {
        project
          .save()
          .then((project) => {
            res.status(200).send(project);
          })
          .catch((err) => {
            if (err) {
              res
                .status(400)
                .send({ message: "project not saved", error: err });
            }
          });
      });
    });
});

router.get("/all", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    res.status(401).send("Invald token");
    return;
  }
  try {
    jwt.verify(token, process.env.JWT_KEY, (err) => {
      if (err) {
        res.status(401).send("Invalid token");
      }
      Project.find()
        .exec()
        .then((projects) => {
          res.status(200).send(projects);
        });
    });
  } catch (err) {
    res.status(400).send("Invalid request for all projects");
  }
});

router.get("/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  if (!projectId) {
    res.status(400).send({ message: "invalid request" });
    return;
  }

  try {
  } catch (err) {
    res.status(400);
  }
  const project = await Project.findOne({ _id: projectId }).exec();

  if (!project) {
    res.status(404).send({ message: "No project found" });
  }

  const tickets = await Ticket.find({ projectId: project._id }).exec();

  if (!tickets) {
    res.status(400).send({ message: "error obtaining tickets" });
    return;
  } else if (tickets.length <= 0) {
    res.status(202).send({ message: "no tickets found" });
    return;
  }

  res.status(200).send({ project, tickets });
});

router.post("/save-ticket/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const token = req.headers["authorization"].split(" ")[1];
  const newTicket = req.body.newTicket;

  if (!projectId) {
    res.status(400).send({ message: "Bad request" });
    return;
  }

  try {
    const userVerified = await jwt.verify(token, process.env.JWT_KEY);
    if (!userVerified) {
      res.status(401).send({ message: "Not authorized" });
      return;
    }

    const user = await User.findById(
      req.body.newTicket.assignedUser
    ).exec();

    if (!user) {
      res.status(404).send({ message: "No user found" });
      return;
    }

    const ticket = new Ticket({
      name: newTicket.name,
      _id: newTicket.uid,
      dateCreated: newTicket.dateCreated,
      createdBy: req.body.currentUser.name,
      ticketDescription: newTicket.description,
      projectId: projectId,
      priority: newTicket.priority,
      status: newTicket.status,
      assignedUser: user.name,
    });

    const savedTicket = await ticket.save();

    if (!savedTicket) {
      res.status(400).send({ message: "Ticket not saved" });
      return;
    }

    const project = await Project.findOne({ _id: projectId }).exec();
    if (!project) {
      res.status(404).send({ message: "No project found" });
      return;
    }

    project.tickets.push(ticket._id);
    project.save();
    res.status(201).send(ticket);
  } catch (err) {
    res.status(500).send({ message: "Ticket not saved" });
  }
});

router.get("/:projectId/ticket/:ticketId", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.ticketId,
    }).exec();

    if (!ticket) {
      res.status(404).send({ message: "No ticket found!" });
      return;
    }

    res.status(200).send(ticket);
  } catch (err) {
    res.status(500).send({
      message: "An error occurred while trying to retrieve ticket data",
      err,
    });
    return;
  }
});

router.get("/:projectId/change-status", async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.projectId,
  }).exec();

  try {
    if (project.status === "Open") {
      project.status = "Closed";
    } else if (project.status === "Closed") {
      project.status = "Open";
    }

    await project.save();
    res.status(200).send(project);
  } catch (err) {
    if (err) {
      res.status(500).send({ message: "status not changed", err });
    }
  }
});

module.exports = router;
