var express = require('express');
var router = express.Router();
const db = require('./database/db');

router.post('/insertPackage', async (req, res) => {
    const { sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, size, weight } = req.body;
  
    try {
      const packageID = await db.insertPackage(sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, size, weight);
      res.json({ message: 'Dit ID er :', id: packageID });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
