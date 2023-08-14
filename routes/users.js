const express = require('express');
const router = express.Router();
const db = require('../config/knex');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let page = req.query.page || 1;
  let limit = req.query.limit || 10;
  let searchQuery = req.query.search || '';
  let roles= []
  await db.conexion.raw('select * from roles').then((data) => {
    roles = data[0];
  });
   db.paginate('users',page,limit)
    .select('*')
    .whereRaw("CONCAT(name, ' ', last_name) LIKE ?", [`%${searchQuery}%`])
    .orWhere('email', searchQuery)
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        delete data[i].password;
        let rol = roles.find((rol) => rol.id === data[i].rol_id);
        data[i].rol=rol;
      }
      res.json({
        "data":data,
        "paginate":db.metaPaginate('users',page,limit),
      });
    }).catch((err) => {
      res.json(err);
    });
 
});

router.post('/create', async function(req, res, next) {
  let user = req.body;
  await db.conexion('users').insert(user).then((data) => {
    res.json({
      "data":data[0],
      'status': 200
    });
  }).catch((err) => {
    res.json(err);
  });
});
router.delete('/delete/:id', async function(req, res, next) {
  let id = req.params.id;
  await db.conexion('users').where('id', id).del().then((data) => {
    res.json({
      "data":data[0],
      'status': 200
    });
  }).catch((err) => {
    res.json(err);
  });
});
router.put('/update/:id', async function(req, res, next) {
  let id = req.params.id;
  let user = req.body;
  await db.conexion('users').where('id', id).update(user).then((data) => {
    res.json({
      "data":data[0],
      'status': 200
    });
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/select',async function(req, res, next) {
  await db.conexion('users').select('id', 'name', 'last_name').then((data) => {
    res.json({
      "data":data,
      'status': 200
    });
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
