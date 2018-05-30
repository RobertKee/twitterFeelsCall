var express = require('express');
var router = express.Router();
import avgArray from './index';

router.get('/data', function(req, res, next){
    res.send("hey")
});

module.exports = router;