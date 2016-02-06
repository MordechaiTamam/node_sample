/**
 * Created by modi on 06/02/16.
 */
var express = require('express');
var router = express.Router();
var locationServices = require('../app/locationServices');


router
    .get('/geocode',function(req, res) {
        var address=req.query.address;
        console.log( "In geocode GET with query address: "+address);
        locationServices.geocode(address,function(geocode ){
            console.log( 'Returning geocode: '+geocode);
            res.send(geocode);
        });
    });
router.get('/wikiNearby',function(req, res) {
        var lon = req.query.lon;
        var lat = req.query.lat;
        console.log( "In wikiNearby GET with query lon: "+lon+" lat: "+lat);
        locationServices.getByCordinates(lon,lat,function(keys ){
            console.log( 'Returning keys: '+keys);
            res.send(keys);
        });
    });

module.exports = router;
