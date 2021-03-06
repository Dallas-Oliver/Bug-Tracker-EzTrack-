const router = require("express").Router();
const Project = require("../models/Project");
const Ticket = require("../models/Ticket");
const User = require("../models/User");

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

//recieves a projectId in the req.body and responds with the project associated with that _id and its tickets.
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

router.post("/:projectId/save-ticket", async (req, res) => {
  const projectId = req.params.projectId;
  const ticketInfo = req.body.newTicket;

  if (!projectId) {
    res.status(400).send({ message: "Bad request" });
    return;
  }

  try {
    const user = await User.findById(ticketInfo.assignedUser).exec();

    if (!user) {
      res.status(404).send({ message: "No user found" });
      return;
    }

    const newTicket = new Ticket({
      name: ticketInfo.name,
      dateCreated: ticketInfo.dateCreated,
      createdBy: req.body.currentUser.name,
      description: ticketInfo.description,
      projectId: projectId,
      priority: ticketInfo.priority,
      status: ticketInfo.status,
      assignedUser: user.name,
    });

    const savedTicket = await newTicket.save();
    if (!savedTicket) {
      res.status(400).send({ message: "Ticket not saved!" });
      return;
    }

    try {
      await Project.updateOne({ _id: projectId }, { $push: { tickets: newTicket } });
    } catch (err) {
      res.status(500).send({ mesage: err });
      return;
    }

    res.status(201).send(newTicket);
  } catch (err) {
    res.status(500).send({ message: err });
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

    //find all tickets with _ids that exist within the current projects tickets array(whick contains ticket ids) and update their status to match the status of the project.
    await Ticket.updateMany(
      { _id: { $in: project.tickets } },
      { status: project.status }
    ).exec();

    await project.save();
    res.status(200).send(project);
  } catch (err) {
    if (err) {
      res.status(500).send({ message: "status not changed", err });
    }
  }
});

router.get("/delete-project/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const deletedProject = await Project.deleteOne({ _id: projectId });

    await Ticket.deleteMany({ _id: { $in: deletedProject.tickets } });
  } catch (err) {
    res.send(err);
  }

  const updatedProjectList = await Project.find();
  res.status(200).send(updatedProjectList);
});

router.post("/update-project-list", async (req, res) => {
  try {
    await Project.deleteMany({ _id: { $in: req.body.selectedItems } });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong", err });
  }

  const updatedProjectList = await Project.find();

  if (updatedProjectList.length === 0) {
    res.status(200).send([]);
    return;
  }

  res.status(200).send(updatedProjectList);
});

router.post("/:projectId/updateTickeList", async (req, res) => {
  const projectId = req.params.projectId;

  const projectWithNewTicketList = await Project.findOneAndUpdate(
    { _id: projectId },
    { tickets: req.body.ticketIdsWithoutSelectedItems },
    { useFindAndModify: false }
  ).exec();

  await Ticket.deleteMany({
    _id: { $in: req.body.selectedItemIds },
  });

  //still need to get an array of all the actual tickets that exist on the current project, not just the ids
  const ticketList = await Ticket.find({
    _id: { $in: projectWithNewTicketList.tickets },
  }).exec();

  res.status(200).send(ticketList);
});
module.exports = router;
