const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  tableId: { type: String, required: true },
  items: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bill", billSchema);
