
var request = require('request');

module.exports = function(name) {
	var q = encodeURIComponent(name);
	var url = `http://nominatim.openstreetmap.org/search?format=json&q=${q}`;

	return new Promise(function(resolve, reject) {
		request({url: url, json: true}, function(error, reponse, body) {
			if (error) {
				reject('There was a problem looking up the geocoordinates of that location');
			} else {
				resolve(`${body[0].lat},${body[0].lon}`);
			}
		});
	});
};