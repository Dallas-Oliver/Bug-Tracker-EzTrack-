const router = require("express").Router();
const Project = require("../models/Project");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//recieves a project object in the req.body and creates a new instance of the Project model and saves it in the DB.
//Also saves the project._id in the current users projectIds array.
//responds with the newly created project.
router.post("/save-project", async (req, res) => {
  const project = new Project(req.body.newProject);

  try {
    const user = await User.findOne({
      _id: req.body.currentUser._id,
    }).exec();

    if (!user) {
      res.status(404).send({ message: "user not found" });
      return;
    }
    const projectSaved = await project.save();
    user.projectIds.push(projectSaved._id);
    const userSaved = await user.save();
    if (!userSaved) {
      res.status(400).send({ message: "user not saved" });
      return;
    }

    if (!projectSaved) {
      res.status(400).send({ message: "project not saved" });
      return;
    }

    res.status(200).send(project);
  } catch (err) {
    res.status(500).send({ message: "project not saved", err });
  }
});

//recives a token in the request headers and checks its validity.
//if the token is valid, responds with a list of all projects saved in the DB.
router.get("/all", (req, res) => {
  try {
    Project.find()
      .exec()
      .then((projects) => {
        res.status(200).send(projects);
      });
  } catch (err) {
    res.status(400).send("Invalid request for all projects");
  }
});

//recieves a projectId in the req.body and responds with that particular project.
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

  res.status(200).send({ project, tickets });
});

router.post("/save-ticket/:projectId", async (req, res) => {
  const projectId = req.params.projectId;
  const newTicket = req.body.newTicket;
  console.log(req.body);

  if (!projectId) {
    res.status(400).send({ message: "Bad request" });
    return;
  }

  try {
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
      createdBy: req.body.user.name,
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
    project.numberOfTickets = project.numberOfTickets + 1;
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
