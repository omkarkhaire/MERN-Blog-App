const express = require("express");
const myrouter = express.Router();
const User = require("../mongodb/usermodel");
const bcrypt = require("bcrypt");
const mypostmodel = require("../mongodb/postmodel");

// for updating user data
myrouter.put("/:Id", async (req, res) => {
  if (req.body.userid === req.params.Id) {
    if (req.body.password) {
      var mynewpassword = await bcrypt.hash(req.body.password, 9);
      req.body.password = mynewpassword;
    }
    try {
      const seeifupdate = await User.findByIdAndUpdate(
        req.params.Id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(seeifupdate);
    } catch (error) {}
  } else {
    res.status(401).json({ msg: "its not your account" });
  }
});
myrouter.delete("/:Id", async (req, res) => {
  if (req.body.userid === req.params.Id) {
    try {
      var user = await User.findById(req.params.Id);
      if (!user) {
        return res.status(200).json({ msg: "user not found" });
      } else {
        try {
          await mypostmodel.deleteMany({ username: user.username }); //deleting all its posts
          await User.findByIdAndDelete(req.params.Id); //then deleting him self
          return res
            .status(200)
            .json({ msg: "user and his posts has been deleted" });
        } catch (error) {
          throw error;
        }
      }
    } catch (error) {
      throw error;
    }
  } else {
    res.status(401).json({ msg: "its not your account" });
  }
});
myrouter.get("/:Id", async (req, res) => {
  try {
    const myuser = await User.findById(req.params.Id);
    if (!myuser) {
      return res.status(200).json({ msg: "user not found" });
    }
    const { password, ...mydata } = myuser._doc;
    return res.status(200).json(mydata);
  } catch (error) {
    res.status(501).json({ error });
  }
});
module.exports = myrouter;
