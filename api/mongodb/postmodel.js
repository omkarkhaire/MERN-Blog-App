const mongoose = require("mongoose");

const postschema = mongoose.Schema(
  {
    titel: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      require: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
); //timestamp shortcut for updatedtime createdtime
const mymodel = mongoose.model("post", postschema);
module.exports = mymodel;
