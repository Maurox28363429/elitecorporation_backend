const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'desarrolladormau@gmail.com',
    pass: 'xeotwaaggpemzgih',
  },
});
module.exports = transporter;