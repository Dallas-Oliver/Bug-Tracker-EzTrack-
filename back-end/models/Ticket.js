const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  name: { type: String, required: true },
  _id: { type: String, required: true },
  dateCreated: String,
  ticketDescription: { type: String, required: true },
  projectId: { type: String, require: true },
  priority: { type: String, required: true },
  status: { type: String, require: true },
});

module.exports = mongoose.model("Ticket", TicketSchema);

/*

    this.name = title;
    this.uid = uuid();
    this.dateCreated = Date.now();
    this.description = description;
    this.history = [];
    this.comments = [];
    this.assignedDeveloper = dev;
    this.projectid = projectid;
    this.priority = "High";
    this.status = "Open";
    this.possibleStatuses = ["Open", "Closed", "Reopened"];
    this.possiblePriorityLevels = ["High", "Medium", "Low"];

*/
