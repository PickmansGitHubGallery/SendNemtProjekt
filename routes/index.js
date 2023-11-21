var express = require('express');
var router = express.Router();
const db = require('../database/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Send Nemt' });
});

router.post('/', async (req, res) => {
  try {
    const package = await db.getPackageByHash(req.body.pakkeNR);
    res.render('sporPakke', { title: 'Spor pakke', package: package});
  } catch (err) {
    console.error('Internal Error:', err);
    res.send(`<script>alert('Pakken eksistere ikke, prøv igen.'); window.location='/';</script>`);
  }
});

module.exports = router;
