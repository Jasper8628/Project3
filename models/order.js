const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userID:{type:String,required:true},
  item1:{type:String},
  item2:{type:String},
  item3:{type:String},
  item4:{type:String},
  item5:{type:String},
  addressLine1:{type:String},
  addressLine2:{type:String},
  pickedUpBy: { type: String },
  subtotal: { type: String },
  createdAt: { type: Date, default: Date.now },
  fulfilledAt:{ type: Date, default: Date.now },
  status: {type:String}
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;