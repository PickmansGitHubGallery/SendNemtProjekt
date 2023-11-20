var express = require('express');
var router = express.Router();
const db = require('../database/db.js');

/*GET login page. */
router.get('/', function(req, res, next) {
    let token = req.cookies.token;
  if (token) {
    db.authenticateToken(token)
      .then((userData) => {
        res.render('index', { title: 'Home', userData: userData });
      })
      .catch((err) => {
        console.error('Error while authenticating token:', err);
        res.status(401).send('Unauthorized');
      });
  }
  else {
    res.render('Login', { title: 'Login' });
  }
});

router.post('/', function(req, res, next) {
  db.authenticateUser(req.body.email, req.body.password)
    .then((userData) => {
      db.setAuthenticationToken(userData.email)
        .then((tokenhash) => {
          res.cookie('token', tokenhash, { maxAge: 9000000, path: '/', domain: 'localhost' });
          if (userData.admin === 1) {
            res.redirect('/admin');
          } else {
            res.redirect('/');
          }
        })
        .catch((err) => {
          console.error('Internal Error:', err);
          res.status(500).send('Internal Server Error');
        });
    })
    .catch((err) => {
      console.error("Du er ikke logget ind", err.message);
    });
});

module.exports = router;
  