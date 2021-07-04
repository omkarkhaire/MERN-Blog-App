const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const connection = require("./mongodb/connection");
const app = express();
const userrouter = require("./routes/auth");
const userfeatures = require("./routes/users");
const postrouter = require("./routes/posts");
const catrouter = require("./routes/categories");
const multer = require("multer");
const path = require("path");

//middleware section
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("tiny"));
app.use("/auth", userrouter);
app.use("/user", userfeatures);
app.use("/post", postrouter);
app.use("/categories", catrouter);
app.use("/images", express.static(path.join(__dirname, "/images")));

//middleware section end

//route section start
app.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./welcome.html"));
});

//for saving images

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("uploaded");
  return res.status(200).json({ msg: "file uploaded successfully" });
});

app.listen(5000, () => {
  console.log("server starting at port no 5000");
});
