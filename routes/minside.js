var express = require('express');
var router = express.Router();
const db = require('../database/db.js');



/* GET statistic page. */
router.get('/', function(req, res, next) {
  let user = " ";
  let token = req.cookies.token;
  if (token) {
    db.authenticateToken(token)
  .then((userData) => {
    user = userData;
    db.getAllPackagesByEmail(user.email)
  .then((packages) => {
    res.render('minside', { title: 'Min side', packages: packages, user: user});
  })
  .catch((err) => {
    console.error("Du er ikke logget ind", err.message)
}) 
  })
  .catch((err) => {
    res.redirect('/login');
    console.log(err.message);
})    
  }
  if(!token){
    res.redirect('/login');
  }
});

router.post('/', function(req, res, next) {
  db.updateUserDetails(req.body.email ,req.body.name,req.body.phone,req.body.address)
  .then(() => {
    console.log("Du har opdateret dine oplysninger")
    res.status(200).send("Opdateret"); // Sending success response back to client
})
.catch((err) => {
    console.error("Du er ikke logget ind", err.message)
}) 
});

+router.post('/sendte', function(req, res, next){
  console.log("Tryk på knap");
  let token = req.cookies.token;
  if (token) {
    db.authenticateToken(token)
  .then((userData) => {
    user = userData;
  db.getAllPackagesBySenderEmail(user.email)
  .then((packages) => {
    res.render('minside', { title: 'Min side', packages: packages, user: user});
  })})};
});

router.post('/modtagne', function(req, res, next){
  console.log("Tryk på knap");
  let token = req.cookies.token;
  if (token) {
    db.authenticateToken(token)
  .then((userData) => {
    user = userData;
  db.getAllPackagesByReciverEmail(user.email)
  .then((packages) => {
    res.render('minside', { title: 'Min side', packages: packages, user: user});
  })})};
});

router.post('/alle', function(req, res, next){
  let token = req.cookies.token;
  if (token) {
    db.authenticateToken(token)
  .then((userData) => {
    user = userData;
  db.getAllPackagesByEmail(user.email)
  .then((packages) => {
    res.render('minside', { title: 'Min side', packages: packages, user: user});
  })})};
  
});

module.exports = router;