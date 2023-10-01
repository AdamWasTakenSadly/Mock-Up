const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
  productName: {
    type: String,
  },
  productID: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  role: {    //Worker's ID to be Added Later instead of just A generic role
    type: String,
    required: true,
  },
  oldAmount: {
    type: Number,
    required: true,
  },
  newAmount: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
