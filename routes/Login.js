var express = require('express');
var router = express.Router();
const db = require('../database/db.js');

/*GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
    db.authenticateUser(res.body.email, res.body.password)
        .then((userData) => {
            console.log("Du logger ind", userData)
        })
        .catch((err) => {
            console.error("Du er ikke logget ind", err.message)
        }) 

});
  