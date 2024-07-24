const mongoose = require("mongoose");
const poserSchema = new mongoose.Schema({
  poserName: {
    type: String,
    maxlength: 20,
    required: true,
  },
  poserEmail: {
    type: String,
    required: true,
    unique: true,
  },
  poserPassword: {
    type: String,
    required: true,
  },
});
const Poser = mongoose.model("Poser", poserSchema);
module.exports = Poser;
