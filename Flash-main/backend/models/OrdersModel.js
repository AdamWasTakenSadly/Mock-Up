const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderID: {
    type: String,
    required: true,
  },
  orderUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  orderProducts: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
