/**
 * Created by modi on 06/02/16.
 */
var express = require('express');
var router = express.Router();
var appCache = require('../app/appCache');

router
    .get("/usage",function(req, res) {
        console.log( "In cache usage GET...");
        var keys = appCache.keys();
        console.log( 'Returning keys: '+keys);
        res.json(keys);
    });

router
    .post("/purgeCache",function(req, res) {
        console.log( "About to flush keys from cache...");
        appCache.flush();
        console.log( "Flushed keys successfully...");
        res.end();
    });

module.exports = router;
