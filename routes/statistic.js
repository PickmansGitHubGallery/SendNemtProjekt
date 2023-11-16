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
    db.getAllPackages(user.email)
  .then((packages) => {
    res.render('statistic', { title: 'Min side', packages: packages, user: user});
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
})
.catch((err) => {
    console.error("Du er ikke logget ind", err.message)
}) 


});

module.exports = router;