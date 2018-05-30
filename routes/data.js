var express = require('express');
var router = express.Router();


router.get('/data', function(req, res, next){
    res.send("hey")
});

module.exports = router;