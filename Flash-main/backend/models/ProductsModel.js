const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  howToUse: {
    type: String,
  },
  amountLeft: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  category: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
