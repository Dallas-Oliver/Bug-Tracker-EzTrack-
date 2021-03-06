const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  dateCreated: String,
  createdBy: { type: String },
  numberOfTickets: Number,
  projectDescription: String,
  tickets: { type: [] },
  assignedUsers: {
    type: [],
    default: undefined,
  },
  status: String,
  dueDate: String,
});

module.exports = mongoose.model("Project", ProjectSchema);
