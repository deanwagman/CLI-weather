
// Modules
var CONFIG = require('./config');
var request = require('request');

module.exports = function(city, geolocation) {
	var url = `https://api.forecast.io/forecast/${CONFIG.WEATHER_API_KEY}/${geolocation}`;

	return new Promise(function (resolve, reject) {
		request({url: url, json: true}, function(error, response, body) {
			if (error) {
				reject('There was a problem getting the weather');
			} else {
				resolve(`It is currently ${body.currently.temperature} degrees in ${city}. ${body.currently.summary}`);
			}
		});
	});
};