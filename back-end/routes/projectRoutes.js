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
    res.status(400).send("Invald token");
    return;
  }
  try {
    jwt.verify(token, process.env.JWT_KEY, (err) => {
      if (err) {
        res.status(400).send("Invalid token");
      }
      Project.find()
        .exec()
        .then((projects) => {
          res.status(200).send(projects);
        });
    });
  } catch (err) {
    res.status(400).send("Invalid token");
  }
});

router.get("/:projectId", (req, res) => {
  const projectId = req.params.projectId;

  if (!projectId) {
    res.status(400).send({ message: "Bad request" });
  } else {
    Project.findOne({ _id: projectId })
      .exec()
      .then((project) => {
        Ticket.find({ projectId: project._id })
          .exec()
          .then((tickets) => {
            res.status(200).send({ project, tickets });
          });
      })
      .catch((err) => {
        res.status(400).send({ message: err });
      });
  }
});

router.post("/save-ticket/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  const token = req.headers["authorization"].split(" ")[1];
  const newTicket = req.body.newTicket;

  if (!projectId) {
    res.status(400).send({ message: "Bad request" });
  } else {
    try {
      jwt.verify(token, process.env.JWT_KEY, (err) => {
        User.findById(req.body.newTicket.assignedUser, function (
          err,
          user
        ) {
          if (err) {
            console.log("Error, no user found");
            res.status(400).send({ message: "no user found" });
          } else {
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

            ticket.save().then((ticket) => {
              console.log(ticket);
              Project.findOne({ _id: projectId })
                .exec()
                .then((project) => {
                  project.tickets.push(ticket._id);
                  project.save();
                });
              res.status(200).send(ticket);
            });
          }
        });
      });
    } catch (err) {
      console.log("error boi");
    }
  }
});

router.get("/:projectId/ticket/:ticketId", (req, res) => {
  Ticket.findOne({ _id: req.params.ticketId })
    .exec()
    .then((ticket) => {
      if (!ticket) {
        res.status(400).send({ message: "No ticket found error 2!" });
      } else {
        res.status(200).send(ticket);
      }
    })
    .catch((err) => {
      if (err) {
        res.status(400).send({ message: "No ticket found error 1!" });
      }
    });
});

router.get("/tickets/all-tickets", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const ticketList = {
    open: [],
    closed: [],
  };

  if (!token) {
    res.status(400).send("Invald token");
    console.log("no token");
  } else {
    try {
      jwt.verify(token, process.env.JWT_KEY, (err) => {
        if (err) {
          res.status(400).send("Invalid token");
        } else {
          Ticket.find()
            .exec()
            .then((tickets) => {
              for (let ticket of tickets) {
                if (ticket.status === "Open") {
                  ticketList.open.push(ticket);
                } else if (ticket.status === "Closed") {
                  ticketList.closed.push(ticket);
                }
              }
              res.status(200).send(ticketList);
            });
        }
      });
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  }
});

router.post("/:projectId/add-user/:userId", (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.params.user_id;

  if (!projectId || !userId) {
    res.status(400).send({ message: "user not added!" });
  } else {
    Project.findOne({ _id: projectId })
      .exec()
      .then((project) => {
        if (!project) {
          res.status(400).send({ message: "no project found!" });
        } else {
          console.log(project);
          // res.status(200).send()
        }
      });
  }
});

module.exports = router;
