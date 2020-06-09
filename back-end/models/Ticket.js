const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  name: { type: String, required: true },
  dateCreated: String,
  createdBy: { type: String },
  description: { type: String, required: true },
  projectId: { type: String, require: true },
  priority: { type: String, required: true },
  status: { type: String, require: true },
  assignedUser: { type: String },
});

module.exports = mongoose.model("Ticket", TicketSchema);
