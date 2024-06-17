const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
