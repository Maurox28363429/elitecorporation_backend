const express = require('express');
const router = express.Router();
const db = require('../config/knex');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let page = req.query.page || 1;
  let limit = req.query.limit || 10;
  let searchQuery = req.query.search || '';
  let agente_id = req.query.agente_id || '';
  let $query= await db
  .paginate('cliente',page,limit)
  .select('*')
  .whereRaw("CONCAT(name, ' ', last_name) LIKE ?", [`%${searchQuery}%`])
  .orWhere('email', searchQuery)
  //.where('agente_id', agente_id)
  .then((data) => {
    res.json({
      "data":data,
      "paginate":db.metaPaginate('cliente',page,limit),
    });
  }).catch((err) => {
    res.json(err);
  });
});
router.post('/create', async function(req, res, next) {
  let cliente = req.body;
  await db.conexion('cliente').insert(cliente).then((data) => {
    res.json({
      "data":data[0],
      'status': 200
    });
  }).catch((err) => {
    res.json(err);
  });
});
module.exports = router;
