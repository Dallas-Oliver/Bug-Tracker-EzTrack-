const mongoose = require("mongoose");
const TicketSchema = require("./Ticket");
const UserSchema = require("./User");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: String,
  _id: String,
  dateCreated: String,
  numberOfTickets: Number,
  projectDescription: String,
  Tickets: {
    type: [TicketSchema],
    default: undefined
  },
  assignedUsers: {
    type: [UserSchema],
    default: undefined
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
