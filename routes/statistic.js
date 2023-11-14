var express = require('express');
var router = express.Router();
const db = require('../database/db.js');



/* GET statistic page. */
router.get('/', function(req, res, next) {
    try {
  const packages = db.getAllPackages();
  res.render('statistic', { title: 'Statistik', packages});
} catch (error) {
    console.log(error);
  }
});

module.exports = router;