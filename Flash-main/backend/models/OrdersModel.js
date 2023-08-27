const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderID: {
    type: String,
  },
  orderUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  orderFirstName: {
    type: String,
    required: true,
  },
  orderLastName: {
    type: String,
    required: true,
  },
  orderPhone: {
    type: String,
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
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentType: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
