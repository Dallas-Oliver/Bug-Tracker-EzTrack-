const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

require("dotenv/config");

//**middlewares**//

// authentication middleware
app.use("/", (req, res, next) => {
  if (req.path === "/users/register" || req.path === "/users/login") {
    //if we're hitting the /register or /login endpoints, we are not currently logged in, therefore don't have a token to verify yet.
    return next();
  }
  const token = req.headers["authorization"].split(" ")[1];
  try {
    if (!token) {
      console.log("invalid token");
      res.status(403).send("Invald token");
      return;
    }
    // if authenticated then next() else return 403
    jwt.verify(token, process.env.JWT_KEY, (err) => {
      if (err) {
        console.log("invalid token");
        res.status(403).send("Invalid token");
      }
      next();
    });
  } catch (err) {
    console.log(err);
  }
});

//route middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/tickets", ticketRoutes);

// connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
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
