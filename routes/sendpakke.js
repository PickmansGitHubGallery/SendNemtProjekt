const express = require('express');
const router = express.Router();
const db = require('../database/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sendPakke', { title: 'SendPakke' });
});

router.post('/', async (req, res) => {
  console.log("Form submitted");
  console.log(req.body);
    const { sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, size, weight } = req.body;
    try {
      const packageID = await db.insertPackage(sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, size, weight);
      res.render('confirmation', { title: 'Confirmation', packageID: packageID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports = router;
