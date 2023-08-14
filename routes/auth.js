const express = require('express');
const router = express.Router();
const db = require('../config/knex');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const secretJWT = require('../config/secretJWT');
/* GET users listing. */
router.post('/login', function(req, res, next) {
    let body=req.body;
    let user=db
    .conexion
    .select('*')
    .from('users')
    .where('email',body.email)
    .where('password',body.password)
    .limit(1)
    .then((datos) => {
      if(datos.length==0){
        res.json({
          "message":"Usuario o contraseña incorrectos",
        },200);
      }else{
        let token = jwt.sign({id:datos[0].id},secretJWT,{expiresIn:60*60*24});
        res.json({
          data:datos,
          token:token,
        },200);
      }
    }).catch((err) => {
      res.json(err);
    });
});
router.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;

  // Verify the refresh token
  jwt.verify(refreshToken, refreshSecret, (err, decoded) => {
    if (err) {
      // Refresh token is invalid or expired
      return res.sendStatus(401);
    }

    // Refresh token is valid
    // Generate a new access token
    const userId = decoded.id;
    const newAccessToken = jwt.sign({ userId }, accessSecret, { expiresIn:60*60*24 });
    // Send the new access token to the client
    res.json({ accessToken: newAccessToken });
  });
});

module.exports = router;
