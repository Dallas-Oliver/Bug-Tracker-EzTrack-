const mongoose = require("mongoose");
const TicketSchema = require("./Ticket");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  password: String,
  roles: {
    type: [String],
    default: undefined
  },
  assignedTickets: {
    type: [TicketSchema],
    default: undefined
  }
});

module.exports = mongoose.model("user", UserSchema);
