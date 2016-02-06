var express = require('express');
var router = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("In users GET...")
  res.send('respond with a resource');
});


module.exports = router;
