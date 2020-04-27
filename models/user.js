const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email:{type:String,required:true},
  phone:{type:Number},
  password:{type:String,required:true},
  address: { type: String },
  image: {type:String},
  fireToken:{type:String},
  radius:{type:Number},
  postcode:{type:Number},
  lat:{type:Number},
  lng:{type:Number},
  shoppingList: [],
  history:[]
});

const User = mongoose.model("User", userSchema);

module.exports = User;