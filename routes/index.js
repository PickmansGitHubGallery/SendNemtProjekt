var express = require('express');
var router = express.Router();
const db = require('../database/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Send Nemt' });
});

router.post('/', async (req, res) => {
  db.getPackage(req.body.pakkeNR).then((package) => {
    res.render('sporPakke', { title: 'Spor pakke', package: package});
  });
});

module.exports = router;
