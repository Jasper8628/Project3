const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  driver: { type: String, required: true },
  subtotal: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  fulfilledAt:{ type: Date, default: Date.now },
  status: {type:String}
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;