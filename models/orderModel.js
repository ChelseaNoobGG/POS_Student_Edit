const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  tableId: {
    type: String,
    required: true,
  },
  cartItems: {
    type: Array,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
