var express = require('express');
var router = express.Router();
const db = require('../database/db.js');

router.get('/', function(req, res, next) {
  let user = null;
  let token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }
  db.authenticateToken(token)
    .then((userData) => {
      user = userData;
      if(user.admin ===1)
      {
        res.render('admin', { title: 'Admin side', packages: [] });
      }
      else res.render('index', { title: 'Send Nemt' });
    })
    .catch((err) => {
      console.error("Du er ikke logget ind", err.message);
      res.redirect('/login');
    });
});
router.post('/', function(req, res, next){
    const inputType = req.body.inputType;
    const inputText = req.body.inputText;
    if (inputType === 'phone') {
      db.getAllPackagesByPhone(inputText)
      .then((packages) => {
        res.render('admin', { packages: packages });
      })
      .catch((err) => {
        console.error("Ingen pakker fundet", err.message)
    }) 
    } else if (inputType === 'email') {
      db.getAllPackagesByEmail(inputText)
      .then((packages) => {
        res.render('admin', { packages: packages });
      })
      .catch((err) => {
        console.error("Ingen pakker fundet", err.message)
    }) 
    } else if (inputType === 'packageID') {
      db.getPackagesByHash(inputText)
      .then((packages) => {
        res.render('admin', { packages: packages });
      })
      .catch((err) => {
        console.error("Ingen pakker fundet", err.message)
    }) 
    }
    
})
router.post('/delete/:id', function(req, res, next) {
  const packageId = req.params.id;
  console.log("DELETE", packageId);
  db.deletePackage(packageId)
  .then((e) => {
    res.redirect('/admin');
  })
  .catch((err) => {
    console.error("Ingen pakker fundet", err.message)
});
});
module.exports = router;


