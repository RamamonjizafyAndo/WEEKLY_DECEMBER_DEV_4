var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
const url = req.query.url
  console.log(url);
  res.redirect(url);
});

module.exports = router;
