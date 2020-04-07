const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  _id: { type: String, required: true },
  dateCreated: String,
  numberOfTickets: Number,
  projectDescription: String,
  Tickets: {
    type: [],
    default: undefined
  },
  assignedUsers: {
    type: [],
    default: undefined
  },
  status: String,
  dueDate: String
});

module.exports = mongoose.model("Project", ProjectSchema);
