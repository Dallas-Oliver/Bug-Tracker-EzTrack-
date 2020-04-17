const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
            });

            newUser
              .save()
              .then((result) => {
                console.log({ message: result });
                res.status(201).send({
                  message: "New user created!",
                  email: result.email,
                });
              })
              .catch((err) => {
                if (err) {
                  res.status(400).send({ message: "user not saved!" });
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

  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      } else {
        bcrypt.compare(
          req.body.password,
          user[0].password,
          (err, result) => {
            if (err) {
              return res.status(401).json({
                message: "Auth failed",
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user[0].email,
                  name: user[0].name,
                  _id: user[0]._id,
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
          }
        );
      }
    });
});

router.get("/get-user-info", (req, res) => {
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
          .then((userInfo) => {
            res.status(200).json(userInfo);
          });
      });
    } catch (err) {
      res.status(400).send("Invalid token");
    }
  }
});

module.exports = router;
