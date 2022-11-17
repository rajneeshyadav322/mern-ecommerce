const mongoose = require("mongoose");
const Cart = require("./cart");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    products: [Cart.schema],
    subTotal: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
