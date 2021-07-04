const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/Blog";

const connection = mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.log("something error occurred in connection with database");
    } else {
      console.log("connected to database successfully");
    }
  }
);

module.exports = connection;
