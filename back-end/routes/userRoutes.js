const router = require("express").Router();
const Project = require("../models/Project");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//returns a list of all registered users.
router.get("/all-users", async (req, res) => {
  const users = await User.find().exec();
  if (!users) {
    res.status(400).send({ message: "No users registered" });
    return;
  }

  res.status(200).send(users);
});

//creates a new user instance and saves it in the DB.
//responds with that users email address
router.post("/register", async (req, res) => {
  const userInfo = req.body;

  const user = await User.findOne({ email: userInfo.email }).exec();

  if (user) {
    res.status(409).json({ message: "email already in use!" });
    return;
  }

  try {
    const hash = await bcrypt.hash(userInfo.password, 10);
    const newUser = new User({
      name: userInfo.name,
      email: userInfo.email,
      companyName: userInfo.companyName,
      password: hash,
      projectIds: [],
      preferences: {
        sidebarColor: "",
      },
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      res.status(400).send({ message: "user not saved!" });
      return;
    }
    console.log(savedUser);
    res.status(201).send({
      message: "New user created!",
      email: savedUser.email,
    });
  } catch (err) {
    if (err) {
      return res.status(500).json({
        message: err,
      });
    }
  }
});

//recieves an Email and password in the req.body which is used to check for an existing corresponding user in the DB.
//if a user is found, responds with a JWT token for that user.
router.post("/login", async (req, res) => {
  // use email to get data from mongo on that user

  const user = await User.findOne({ email: req.body.email }).exec();

  if (!user) {
    res.status(400).json({
      message: "No User registered with that email address!",
    });
    return;
  }

  try {
    const result = await bcrypt.compare(req.body.password, user.password);

    if (!result) {
      res.status(400).send({ message: "password does not match!" });
      return;
    }

    const token = await jwt.sign(
      {
        email: user.email,
        name: user.name,
        _id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "2 days" }
    );
    return res.status(200).json({
      message: "Auth successful",
      token: token,
    });
  } catch (err) {
    if (err) {
      res.status(400).send({ message: err });
      return;
    }
  }
});

//responds with the user object, list of assigned tickets, and list of asssigned projects for the currently logged in user
router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId).exec();

  if (!user) {
    res.status(400).send({ message: "no user found" });
    return;
  }

  const projectList = await Project.find({
    _id: { $in: user.projectIds },
  }).exec();

  const ticketList = await Ticket.find({
    projectId: { $in: projectList.map((project) => project._id) },
  }).exec();

  res.status(200).send({ projectList, ticketList, user });
});

//responds with the user.preferences object for the currently logged in user
router.get("/:userId/preferences", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).exec();

    if (!user) {
      req.status(404).send({ message: "No user found!" });
      return;
    }

    const userPreferences = user.preferences;

    if (!userPreferences) {
      res.status(404).send({ message: "This user has no preferences" });
      return;
    }

    res.status(200).send(userPreferences);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something went wrong on our end!", err });
  }
});

//recieves an object in the req.body which replaces the prefernces object for the currently logged in user,
// responds with that new preferences object.
router.post("/:userId/updatePreferences", async (req, res) => {
  const newPreferences = req.body;

  if (!newPreferences) {
    res.status(404).send({ message: "No new preferences" });
    return;
  }

  try {
    const user = await User.findOne({ _id: req.params.userId }).exec();
    if (!user) {
      res.status(404).send({ message: "No user found" });
      return;
    }

    user.preferences = newPreferences;
    const savedUser = await user.save();
    if (!savedUser) {
      res.status(500).send({ message: "Something went wrong" });
      return;
    }

    res.status(200).send(user.preferences);
  } catch (err) {
    res.status(500).send({ message: "something went wrong", err });
  }
});

module.exports = router;
