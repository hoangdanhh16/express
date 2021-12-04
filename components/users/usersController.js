const express = require("express");
const router = express.Router();

const User = require("./usersModel");

/* GET users listing. */
module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (err) {
      res.json({ message: err });
    }
  },

  postUser: async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        birthday: req.body.birthday,
      });
      const saved = await user.save();
      res.json(saved);
    } catch (err) {
      res.json({ message: err });
    }
  },

  findUser: async (req, res) => {
    try {
      if (!req.body) {
        responseObj = {
          status: "error",
          msg: "Invalid input",
          body: {},
        };
        res.send(responseObj);
      } else {
        User.find(
          {
            username: {
              $regex: `^${req.body.username.name.trim()}`,
              $options: "i",
            },
          },
          (err, docs) => {
            if (err) {
              responseObj = {
                status: "error",
                msg: "Invalid input",
                body: err,
              };
              res.send(responseObj);
            } else {
              responseObj = {
                status: "success",
                msg: "Found",
                body: docs,
              };
              res.send(responseObj.body);
            }
          }
        );
      }
    } catch (err) {
      res.json({ message: err });
    }
  },

  updateUser: async (req, res) => {
    try {
      if (!req.body) {
        responseObj = {
          status: "error",
          msg: "Missing input",
          body: {},
        };
        res.send(responseObj);
      } else {
        console.log(req.body.oldUser, req.body.newUser)
        User.findOneAndUpdate(req.body.odlUser, req.body.newUser, (err, docs) => {
          if (err) {
            responseObj = {
              status: "error",
              msg: "Invalid input",
              body: err,
            };
            res.send(responseObj);
          } else {
            responseObj = {
              status: "success",
              msg: "Found",
              body: docs,
            };
            res.send(responseObj.body);
          }
        });
      }
    } catch (err) {
      res.json({ message: err });
    }
  },
};
