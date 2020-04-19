const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverSchema = new Schema({
  customer: { type: String, required: true },
  subtotal: { type: String, required: true },
  pickedupAt: { type: Date, default: Date.now },
  fulfilledAt:{ type: Date, default: Date.now },
  status: {type:String}
});

const Delivery = mongoose.model("Delivery", deliverSchema);

module.exports = Delivery;