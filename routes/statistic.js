var express = require('express');
var router = express.Router();
const db = require('../database/db.js');



/* GET statistic page. */
router.get('/', function(req, res, next) {
  db.getAllPackages("kevin.dyhr@gmail.com") //TODO: Change to req.session.email
  .then((packages) => {
    res.render('statistic', { title: 'Statistik', packages: packages});
  })
  .catch((err) => {
    console.error("Du er ikke logget ind", err.message)
}) 
});

module.exports = router;