const express = require('express');
const router = express.Router();
const db = require('../config/knex');

/* GET roles listing. */
router.get('/', async function(req, res, next) {
  let page = req.query.page || 1;
  let limit = req.query.limit || 10;
  let searchQuery = req.query.search || '';
   db.paginate('roles',page,limit)
    .select('*')
    .whereRaw("name LIKE ?", [`%${searchQuery}%`])
    .then((data) => {
      res.json({
        "data":data,
        "paginate":db.metaPaginate('roles',page,limit),
      });
    }).catch((err) => {
      res.json(err);
    });
 
});

module.exports = router;
