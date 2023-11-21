const express = require('express');
const router = express.Router();
const db = require('../database/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = " ";
  let token = req.cookies.token;
  if (token) {
    db.authenticateToken(token)
  .then((userData) => {
    user = userData;
    res.render('sendPakke', { title: 'Min side',  user: user});
  })
  .catch((err) => {
    console.error("Du er ikke logget ind", err.message)
  }) 
  }
  if(!token){
    res.render('sendPakke', { title: 'SendPakke', user: []});
  }
});

router.post('/', async (req, res) => {
    const { sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, size, weight } = req.body;
    try {
      const packageID = await db.insertPackage(sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, size, weight);
      res.render('confirmation', { title: 'Confirmation', packageID: packageID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  


module.exports = router;
