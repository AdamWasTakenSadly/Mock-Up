const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bluet3253@gmail.com',
    pass: 'kdkm sokp whne rewm',
  },
});

module.exports = transporter;