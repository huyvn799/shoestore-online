const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    brand: { type: String },
    seriesCode: {type: String},
    categories: { type: Array },
    color: { type: String },
    size: { type: Object },
    price: { type: Number, required: true },
    // inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
