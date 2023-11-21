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

router.post('/:id', function(req, res, next) {
    const id = req.params.id; // Access the ID from the URL
    const { sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, size, weight } = req.body;
    console.log("UPDATE", id);
    db.updatePackage(id, sName, sAddress, sEmail, sPhone, rName, rAddress, rEmail, rPhone, size, weight)
        .then(() => {
            res.render('admin', { packages: [] });
        })
        .catch((err) => {
            console.error("Error updating package:", err.message);
            res.status(500).send("Error updating package");
        });
});
  module.exports = router;