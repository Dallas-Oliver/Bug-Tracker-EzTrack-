const Ticket = require("../models/Ticket");
const Project = require("../models/Project");
const router = require("express").Router();

router.get("/all", async (req, res) => {
  const tickets = await Ticket.find().exec();

  if (!tickets || tickets.length <= 0) {
    res.status(400).send({ message: "no tickets found" });
    return;
  }

  res.status(200).send(tickets);
});

module.exports = router;
