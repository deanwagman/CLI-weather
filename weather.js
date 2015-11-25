
// Modules
var request = require('request');

// Variables
var API_KEY = '50a35d629a1860b4f62e371bcd566941';

module.exports = function(city, geolocation, callback) {
	var url = `https://api.forecast.io/forecast/${API_KEY}/${geolocation}`;

	request({url: url, json: true}, function(error, response, body) {
		if (error) return callback();

		callback(`It is currently ${body.currently.temperature} degrees in ${city}. ${body.currently.summary}`);
	});
};