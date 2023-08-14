const express = require('express');
const router = express.Router();
const transporter = require('../config/nodemailer');
router.post('/', async function(req, res, next) {
  let body = req.body;
  let mailOptions = {
    from: 'Servidor Node',
    to: body.to,
    subject: body.subject,
    text: body.text,
    html: body.html,
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      res.json({
        "data":error,
        'status': 500
      });
    } else {
      res.json({
        "data":info,
        'status': 200
      });
    }
  });
});

module.exports = router;
