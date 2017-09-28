var mapperConfig = require('../pam_mapping');
const logger = require('pelias-logger').get('api');

function setup() {
  function middleware(req, res, next) {
    return postMapper(req, res, next);
  }

  return middleware;
}

function postMapper(req, res, next) {

  // do nothing if there's nothing to process
  if (!res || !res.body) {
    return next();
  }

  var map = mapperConfig.pamMap;

  // Map each OSM property to corresponding PAM property
  res.body.features.forEach(function(feature) {
  	for(var mappedProperty in map) {
    	for(var oldKey in feature.properties) {
   			if(oldKey === mappedProperty) {
   	  		var newKey = map[mappedProperty];
   	  		feature.properties[newKey] = feature.properties[oldKey];
   	  		delete feature.properties[oldKey];
   	  	}
     	}
    }
  });

  next();
}

module.exports = setup;