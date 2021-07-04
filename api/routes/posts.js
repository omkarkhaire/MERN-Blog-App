const express = require("express");
const myrouter = express.Router();
const Postmodel = require("../mongodb/postmodel");

myrouter.post("/create", async (req, res) => {
  const newpost = new Postmodel();
  newpost.titel = req.body.titel;
  newpost.desc = req.body.desc;
  newpost.photo = req.body.photo;
  newpost.username = req.body.username;
  newpost.categories = req.body.categories;
  try {
    const data = await newpost.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json(error);
  }
});
myrouter.put("/:Id", async (req, res) => {
  try {
    const postdata = await Postmodel.findById(req.params.Id);
    if (postdata) {
      try {
        if (postdata.username === req.body.username) {
          const newdata = await Postmodel.findByIdAndUpdate(
            req.params.Id,
            { $set: req.body },
            { new: true }
          );
          return res.status(200).json(newdata);
        } else {
          return res.status(200).json({ msg: "its not your post" });
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      return res.status(200).json({ msg: "post not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
myrouter.get("/:Id", async (req, res) => {
  const data = await Postmodel.findById(req.params.Id);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(200).json({ msg: "no such post found" });
  }
});
myrouter.get("/", async (req, res) => {
  const { username, category } = req.query;
  console.log(req.query);

  try {
    var alldata;
    if (username && category) {
      alldata = await Postmodel.find({
        username,
        categories: { $in: [category] },
      });
      if (alldata.length <= 0) {
        return res
          .status(200)
          .json({ msg: `no post found belonging to category=${category}` });
      }
      return res.status(200).json(alldata);
    } else if (username) {
      alldata = await Postmodel.find({ username });
      return res.status(200).json(alldata);
    } else if (category) {
      alldata = await Postmodel.find({ categories: { $in: [category] } });
      return res.status(200).json(alldata);
    } else {
      //if username and category are not presnet then we have to return all data
      alldata = await Postmodel.find();
      return res.status(200).json(alldata);
    }
  } catch (error) {
    return res.status(200).json(error);
  }
});

myrouter.delete("/:Id", async (req, res) => {
  const responce = await Postmodel.findByIdAndDelete(req.params.Id);
  if (responce.username === req.body.username) {
    res.status(200).json({ msg: "post deleted successfully", data: responce });
  } else {
    res
      .status(200)
      .json({ msg: "post deleted unsuccessfully", data: responce });
  }
});
myrouter.get("/myposts/:Username", async (req, res) => {
  var username = req.params.Username;
  const responce = await Postmodel.find({ username });
  if (responce) {
    console.log(responce);
    return res.status(200).json(responce);
  }
  return res.status(200).json({ data: "not found" });
});

module.exports = myrouter;
