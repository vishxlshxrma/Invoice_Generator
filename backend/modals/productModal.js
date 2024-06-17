const mongoose = require("mongoose");

const productModal = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    requried: true,
  },
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Invoice",
  },
});

const Product = mongoose.model("Product", productModal);

module.exports = Product;
