var express = require('express');
var router = express.Router();
const db = require('../database/db.js');

/* GET createUser page. */
router.get('/', function(req, res, next) {
    res.render('Createuser', { title: 'Create User' });
});

router.post('/', function(req, res, next) {
    db.createUser(req.body.email, req.body.password)
        .then(() => {
            res.render('index');
        })
        .catch((err) => {
            console.error('Error creating user:', err);
            res.status(500).send('Internal Server Error');
        });
});