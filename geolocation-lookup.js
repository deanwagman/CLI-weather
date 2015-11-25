
var request = require('request');

module.exports = function(name, callback) {
	var q = encodeURIComponent(name);
	var url = `http://nominatim.openstreetmap.org/search?format=json&q=${q}`;

	request({url: url, json: true}, function(error, reponse, body) {
		if (error) return callback();

		// 'lat,long'
		callback(`${body[0].lat},${body[0].lon}`);
	});
};