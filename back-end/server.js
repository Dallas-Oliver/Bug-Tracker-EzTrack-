const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const mongoose = require("mongoose");
// const Project = require("./models/Project");

require("dotenv/config");

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);

// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log({ error: err });
    } else {
      console.log("connected to database!");
    }
  }
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
