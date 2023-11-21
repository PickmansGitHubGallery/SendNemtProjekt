var express = require('express');
var router = express.Router();
const db = require('../database/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Send Nemt' });
});

router.post('/', async (req, res) => {
  db.getPackageByHash(req.body.pakkeNR).then((package) => {
    res.render('sporPakke', { title: 'Spor pakke', package: package});
  });
});

router.get('/api/:id',async (req,res) =>{
  db.getPackageByID(req.params.id).then((package) => {
  res.json(package)
  })
  .catch((err) => {
    console.error('fejl', err.message)
  });

});


module.exports = router;
