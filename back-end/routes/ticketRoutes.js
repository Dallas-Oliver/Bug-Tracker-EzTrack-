const Ticket = require("../models/Ticket");
const Project = require("../models/Project");
const router = require("express").Router();

router.get("/all", async (req, res) => {
  const tickets = await Ticket.find().exec();

  if (!tickets) {
    res.status(500).send({ message: "something went wrong" });
    return;
  }

  if (tickets.length <= 0) {
    res.status(200).send({ message: "no tickets found" });
    return;
  }

  res.status(200).send(tickets);
});

router.get("/:ticketId/change-status", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.params.ticketId }).exec();

  if (!ticket) {
    res.status(404).send({ message: "no ticket found" });
    return;
  }

  try {
    if (ticket.status === "Open") {
      ticket.status = "Closed";
    } else if (ticket.status === "Closed") {
      ticket.status = "Open";
    }

    await ticket.save();
    res.status(200).send(ticket);
  } catch (err) {
    if (err) {
      res.status(500).send({ message: "status not changed", err });
    }
  }
});

module.exports = router;
