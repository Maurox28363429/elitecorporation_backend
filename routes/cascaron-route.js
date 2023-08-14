const express = require('express');
const router = express.Router();
const db = require('../config/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let page = req.query.page || 1;
  let limit = req.query.limit || 10;
  db.paginate('users',page,limit).then((data) => {
    res.json({
      "data":data,
      "paginate":db.metaPaginate('users',page,limit),
    });
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
