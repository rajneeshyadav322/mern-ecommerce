const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    categories: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
