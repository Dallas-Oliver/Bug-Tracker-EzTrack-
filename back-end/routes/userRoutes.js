const router = require("express").Router();
const Project = require("../models/Project");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/all-users", async (req, res) => {
  const users = await User.find().exec();
  if (!users) {
    res.status(400).send({ message: "No users registered" });
    return;
  }

  res.status(200).send(users);
  // User.find()
  //   .exec()
  //   .then((users) => {
  //     if (!users || users.length <= 0) {
  //       res.status(400).send({ message: "no users registered" });
  //     } else {
  //       res.status(200).send(users);
  //     }
  //   });
});

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
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      res.status(400).send({ message: "user not saved!" });
      return;
    }
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

// router.get("/current-user", (req, res) => {
//   const token = req.headers["authorization"].split(" ")[1];

//   if (!token) {
//     res.status(400).send("Invald token");
//   } else {
//     try {
//       jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
//         if (err) {
//           res.status(400).send("Invalid token");
//         }

//         User.findOne({ email: decoded.email })
//           .exec()
//           .then((user) => {
//             res.status(200).send(user);
//           })
//           .catch((err) => {
//             if (err) {
//               res.status(400).send({ message: "No user found!" });
//             }
//           });
//       });
//     } catch (err) {
//       res.status(400).send("Invalid token");
//     }
//   }
// });

// router.get('/assign/:userId', (req, res) => {
//   const userId = req.params.userId;

//   if(!userId) {
//     res.status(400).send({message: 'no user found'})
//   } else {
//     User.findOne({_id: userId}).exec().then(user => {
//       if(!user) {
//         res.status(400).send({message: 'no user found'})
//       } else {

//       }
//     })
//   }
// })

module.exports = router;
