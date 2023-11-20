var express = require('express');
var router = express.Router();
const db = require('../database/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Admin side' },{packages: []});

});

router.post('/', function(req, res, next){
    console.log('vi er her' + req.body.tlf);
    db.getAllPackagesByAdmin(req.body.tlf)
    .then((packages) => {
        res.render('admin', { packages: packages });

      })
      .catch((err) => {
        console.error("Ingen pakker fundet", err.message)
    }) 
})

module.exports = router;


