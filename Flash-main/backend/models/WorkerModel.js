const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workerSchema = new Schema({
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
  role: {
    type: String,
    enum: ['Admin', 'WM'], // Admin or WM (Worker Manager)
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);
