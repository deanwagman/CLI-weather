
// Modules
var weather = require('./weather');
var location = require('./location');
var geoLookup = require('./geolocation-lookup');

// Set up Yargs for location or -l agrument
var argv = require('yargs')
	.option('location', {
		alias: 'l',
		demand: false,
		describe: 'Geolocation of location (lat/long)',
		type: 'string'
	})
	.help('help')
	.argv;

// If location flag was provided, use that location, else look up their IP for location
if (typeof argv.location === 'string' && argv.location.length > 0) {

	// Get geocoordinates of location name for weather API
	geoLookup(argv.location, function(latLng) {
		if (!latLng) return console.log('There was a problem retrieving the geocoordinates of that location.');

		// Weather information from weather module
		weather(argv.location, latLng, function(weatherInformation){
			if (!weatherInformation) return console.log('There was a problem getting the weather detail of that location');

			// We made it! Woo Hoo!
			console.log(weatherInformation);
		});
	});
} else {

	// Get their Geocoordinates from an IP lookup
	location(function(location) {
		if (!location) return console.log('There was a problem retrieving location');

		// Weather information from weather module
		weather(location.city, location.loc, function(weatherInformation){
			if (!weatherInformation) return console.log('There was a problem getting the weather detail of that location');
			
			console.log(weatherInformation);
		});
	});
}