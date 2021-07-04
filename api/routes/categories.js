const express = require("express");
const Mymodel = require("../mongodb/categorymodel");
const myrouter = express.Router();

myrouter.get("/", async (req, res) => {
  try {
    const alldata = await Mymodel.find();
    return res.status(200).json(alldata);
  } catch (error) {
    return res.status(200).json(error);
  }
});

myrouter.post("/create", async (req, res) => {
  try {
    const newcategory = new Mymodel();
    newcategory.name = req.body.name;
    const newdata = await newcategory.save();
    if (newdata) {
      return res.status(200).json(newdata);
    } else {
      return res
        .status(200)
        .json({ msg: "something error occured in creation" });
    }
  } catch (error) {
    return res.status(200).json(error);
  }
});

module.exports = myrouter;
