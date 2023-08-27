const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const promocodeSchema = new Schema({
  promocode: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  specificUser: {
    type: String,
    default: 'all',
  },
}, { timestamps: true });

module.exports = mongoose.model('Promocode', promocodeSchema);
