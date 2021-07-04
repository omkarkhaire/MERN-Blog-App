const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepicture: {
      type: String,
      default: " ",
    },
  },
  { timestamps: true }
); //timestamp shortcut for updatedtime createdtime
const mymodel1 = mongoose.model("users", userschema);
module.exports = mymodel1;
//here users is the name of collection
