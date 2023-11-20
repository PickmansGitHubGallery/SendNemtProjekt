const express = require('express');
const router = express.Router();
const db = require('../database/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('sporPakke', { title: 'Spor pakke'});
  });

module.exports = router;