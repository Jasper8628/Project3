const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: String,
  orders: [],
  deliveries:[]
});

const User = mongoose.model("User", userSchema);

module.exports = User;