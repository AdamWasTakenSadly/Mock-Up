const mongoose = require("mongoose");
const ProductsModel = require("./ProductsModel");

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    /*cart: [
      {
        productName: { type: String, required: true },
        productID: { type: mongoose.Schema.Types.ObjectId, required: true },
      },
    ],*/

    cart: [
      {
        // Embed the product information directly
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductsModel", // Use the ProductsModel schema as the type
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
