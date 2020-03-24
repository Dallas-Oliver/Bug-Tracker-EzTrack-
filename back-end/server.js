const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");
app.use(bodyParser.json());

app.use(cors());
// const Project = require("./models/Project");

app.post("/users/save-user-info", (req, res) => {
  const userInfo = req.body;

  //use userInfo to save user data to mongo
  console.log(userInfo);

  res.status(200).send({ code: 200, email: userInfo.email });
});

app.get("/users/get-user/:user_email", (req, res) => {
  let userEmail = req.params.user_email;

  //use userEmail to get data from mongo on that user
  const userData = {
    name: "dallas",
    _id: "rr44erd093434",
    roles: ["admin", "developer"]
  };

  console.log(userEmail);

  res.json(userData);
});

// mongoose.connect(
//   "mongodb+srv://dallasoliver:MissSusie12%21@cluster0-f525n.mongodb.net/test?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   },
//   err => {
//     if (err) {
//       console.log({ error: err });
//     } else {
//       console.log("connected to database!");
//     }
//   }
// );

// const Schema = mongoose.Schema;

// const testSchema = new Schema({
//   name: { type: String }
// });

// const Test = mongoose.model("Test", testSchema);

// let newTest = Test({
//   name: "Dallas"
// });

// newTest.save().then(data => {
//   console.log(data, "saved!");
// });

// app.post("/projects/save-project", (req, res) => {
//   const body = req.body;

//   const project = new Project({
//     name: body.name,
//     _id: body.uid,
//     dateCreated: body.dateCreated,
//     numberOfTickets: body.numberOfTickets,
//     projectDescription: body.projectDescription,
//     Tickets: body.Tickets,
//     assignedUsers: body.assignedUsers
//   });

//   project.save().then(data => {
//     console.log("saved", data);
//   });
// });

// app.get("/projects/get-project", (req, res) => {});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
