const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String, required: false },
  password: { type: String, required: true },
  projectIds: [],
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
