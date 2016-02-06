/**
 * Created by modi on 06/02/16.
 */
var NodeCache = require( "node-cache" );
var myCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
exports.get=function get(key) {
    console.log("In appCache.get with key: "+key);
    var retVal;
    myCache.get( key, function( err, value ){
        if( !err ){
            if(value == undefined){
                console.log("key: "+key+ " not found.")
            }else{
                console.log( value );
                retVal=value;
            }
        }
    });
    console.log("AppCache about to return "+retVal);
    return retVal;
};

exports.put=function put(key, value) {
    console.log("In appCache.put");
    myCache.set(key, value, function (err, success) {
        if (!err && success) {
            console.log("Successfully add key: " + key + " and value: " + value + " to cache");
            // true
            // ... do something ...
        } else {
            console.log("Failed to add key: " + key + " to cache. Error: " + err);
        }
    });
};

exports.keys = function keys(){
    console.log("In getting keys: " );
    return myCache.keys( function( err, mykeys ){
        if( !err ){
            console.log( mykeys );
            return mykeys;
        }
    });
}

exports.flush = function f(){
    var stats=myCache.getStats();
    console.log("stats before flush: "+JSON.stringify(stats));
    myCache.flushAll();
    stats=myCache.getStats();
    console.log("stats after flush: "+JSON.stringify(stats));
}