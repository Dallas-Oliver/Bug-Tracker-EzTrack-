const router = require("express").Router();
const Project = require("../models/Project");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/all-users", (req, res) => {
  User.find()
    .exec()
    .then((users) => {
      if (!users || users.length <= 0) {
        res.status(400).send({ message: "no users registered" });
      } else {
        res.status(200).send(users);
      }
    });
});

router.post("/register", (req, res) => {
  const userInfo = req.body;
  User.find({ email: userInfo.email })
    .exec()
    .then((user) => {
      if (false) {
        return res.status(409).json({ message: "email already in use!" });
      } else {
        bcrypt.hash(userInfo.password, 10, function (err, hash) {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          } else {
            const newUser = new User({
              name: userInfo.name,
              email: userInfo.email,
              companyName: userInfo.companyName,
              password: hash,
              projectIds: [],
            });

            newUser
              .save()
              .then((result) => {
                res.status(201).send({
                  message: "New user created!",
                  email: result.email,
                });
              })
              .catch((err) => {
                if (err) {
                  res
                    .status(400)
                    .send({ message: "user not saved!", err });
                  console.log(err);
                }
              });
          }
        });
      }
    });
});

router.post("/login", async (req, res) => {
  // use email to get data from mongo on that user

  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "No User registered with that email address!",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed",
            });
          }
          if (result) {
            const token = jwt.sign(
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
          }
          return res.status(401).json({
            message: "Auth failed",
          });
        });
      }
    });
});

router.get("/current-user", (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    res.status(400).send("Invald token");
  } else {
    try {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          res.status(400).send("Invalid token");
        }

        User.findOne({ email: decoded.email })
          .exec()
          .then((user) => {
            res.status(200).send(user);
          })
          .catch((err) => {
            if (err) {
              res.status(400).send({ message: "No user found!" });
            }
          });
      });
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  }
});

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
