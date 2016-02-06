/**
 * Created by modi on 06/02/16.
 */

var request = require("request");
var appCache = require('./appCache');
var geocoder = require('simple-geocoder');

this.getByCordinates = function getByCordinates(lon,lat,callback) {
    var coordinates = "lat:"+lat+" lon:"+lon;
    console.log( 'In location services getting location by coordinates: '+coordinates);
    var cachedQueryResult = appCache.get(coordinates);
    if(!cachedQueryResult) {
        var uri ="https://en.wikipedia.org/w/api.php?action=query&prop=coordinates%7Cpageimages%7Cpageterms&colimit=50&piprop=thumbnail&pithumbsize=144&format=json&pilimit=50&wbptterms=description&generator=geosearch&ggscoord=" + lat +"%7C" + lon + "&ggsradius=10000&ggslimit=3";
        console.log(uri);
            request(uri, function (error, response, body) {
            if(!error){
                var JSONObject = JSON.parse(body);
                var retVal = [];
                if(JSONObject.query) {
                    var queryResult = JSONObject.query.pages;
                    console.log("pages: " + queryResult);
                    for (n1 in queryResult) {
                        if(queryResult.hasOwnProperty(n1)) {
                            retVal.push({
                                "title": queryResult[n1].title,
                                "thumbnailUrl": queryResult[n1].thumbnail.source,
                                "coordinates": {
                                    "lon": queryResult[n1].coordinates[0].lon,
                                    "lat": queryResult[n1].coordinates[0].lat
                                }
                            });
                        }
                    }
                }
                appCache.put(coordinates,retVal);
                callback(retVal);
            }else{
                callback(error);
            }
        });
        return;
    }else {
        console.log("Found near by locations in cache...");
        callback(cachedQueryResult);
    }
};

this.geocode = function getGeocodes(address,callback){
    console.log( 'In geocode GET by' +address);
    var locationFromCache = appCache.get(address);
    if(!locationFromCache) {
        geocoder.geocode(address, function (success, location) {
            if (success) {
                console.log("Location: ", location.x, location.y);
                appCache.put(address,location);
                callback(location);
            } else {
                console.log("Couldn't find coordinates");
                callback("Couldn't find coordinates");
            }
        });
    }else {
        console.log("Found location in cach");
        callback(locationFromCache);
    }
};
