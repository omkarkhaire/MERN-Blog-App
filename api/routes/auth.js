const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../mongodb/usermodel");
//register
Router.post("/register", async (req, res) => {
  try {
    var ckeckusername = await User.findOne({ username: req.body.username });
    if (ckeckusername) {
      var check_his_status = await User.findOne({
        username: req.body.username,
        email: req.body.email,
      });
      if (check_his_status) {
        return res.status(200).json({
          msg: "You Already Have Account Please Login ",
        });
      }

      return res
        .status(200)
        .json({ msg: "username already exists please use another user name" });
    }
    var ckeckemail = await User.findOne({ email: req.body.email });
    if (ckeckemail) {
      return res
        .status(200)
        .json({ msg: "This email is used by another user" });
    }

    var createuser = new User();
    createuser.username = req.body.username;
    createuser.email = req.body.email;
    var encryptedpass = await bcrypt.hash(req.body.password, 12);
    createuser.password = encryptedpass;
    createuser.profilepicture = req.body.profilepicture;

    const check = await createuser.save();
    res.status(200).json(check);
  } catch (error) {
    return res.status(500).json(err);
  }
});
Router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    var email = req.body.email;
    const check = await User.findOne({ email });
    if (!check) {
      return res.status(200).end("user not found please register");
    } else {
      const ismatch = await bcrypt.compare(req.body.password, check.password);
      if (ismatch === true) {
        const { password, ...others } = check._doc;
        return res.status(200).json(others);
      } else {
        return res.status(200).end("wrong password");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = Router;
