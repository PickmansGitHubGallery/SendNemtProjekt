var express = require('express');
var router = express.Router();
const db = require('../database/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("HejMeDig")
  res.render('sendPakke', { title: 'SendPakke' });
});



router.post('/', async (req, res) => {
    const { sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, size, weight } = req.body;
    console.log("Hej");
    try {
      const packageID = await db.insertPackage(sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, size, weight);
      res.json({ message: 'Dit ID er :', id: packageID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;