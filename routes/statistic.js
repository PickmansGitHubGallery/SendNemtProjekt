var express = require('express');
var router = express.Router();
const db = require('../database/db.js');



/* GET statistic page. */
router.get('/', function(req, res, next) {
  let user ="";
  db.getUserInfo("hej@gmail.com")
  .then((userdata) => {
    user = userdata;
  })
  .catch((err) => {
    console.error("Du er ikke logget ind", err.message)
})    
  
  
  db.getAllPackages("kevin.dyhr@gmail.com") //TODO: Change to req.session.email
  .then((packages) => {
    console.log(user);
    res.render('statistic', { title: 'Min side', packages: packages, user: user});
  })
  .catch((err) => {
    console.error("Du er ikke logget ind", err.message)
}) 
});

router.post('/', function(req, res, next) {
  db.updateUserDetails("hej@gmail.com",req.body.name,req.body.address,req.body.phone)
  .then(() => {
    console.log("Du har opdateret dine oplysninger")
})
.catch((err) => {
    console.error("Du er ikke logget ind", err.message)
}) 


});

module.exports = router;