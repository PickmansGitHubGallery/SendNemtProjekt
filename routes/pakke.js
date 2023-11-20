var express = require('express');
var router = express.Router();
const db = require('../database/db.js');

router.get('/:id', function(req, res, next) {
    const packageId = req.params.id;
    db.getPackageByID(packageId)
    .then((package) => {
      res.render('pakke', { package: package });
    })
    .catch((err) => {
      console.error("Ingen pakker fundet", err.message)
  });
  });

router.post('/:ID', function(req, res, next){
    const id = req.params.ID; // Access the ID from the URL
    console.log("Package ID:", id);
    db.getAllPackagesByAdmin(req.body.sEmail)
    .then((packages) => {
        res.render('admin', { packages: packages });
      })
      .catch((err) => {
        console.error("Ingen pakker fundet", err.message)
    }) 
  })
router.delete('/pakke/:id', function(req, res, next) {
    const packageId = req.params.id;
    //slet pakke
    console.log("slet pakke virker");
    db.deletePackage(packageId)
    .then((package) => {
      res.redirect('/admin');
    })
    .catch((err) => {
      console.error("Ingen pakker fundet", err.message)
  });
  });
 
 
  module.exports = router;