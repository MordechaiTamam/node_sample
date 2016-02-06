var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log( '******** In GET ********' );
  res.render('index', { title: 'Express' });
});
router.post('/aa', function(req, res) {
  console.log( '******** In POST ********' );
  res.render('index', { title: 'Express' });
});
module.exports = router;
