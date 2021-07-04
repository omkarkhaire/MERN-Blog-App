const mongoose = require("mongoose");

const categorychema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); //timestamp shortcut for updatedtime createdtime
const mymodel = mongoose.model("category", categorychema);
module.exports = mymodel;
