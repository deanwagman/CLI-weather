
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

// If they gave us a location use it, else do an IP address lookup
if (typeof argv.location === 'string' && argv.location.length > 0) {

	// Lookup the location name to get geo information
	geoLookup(argv.location).then(function(latLng) {

		// Get Weather Information from that geolocation
		return weather(argv.location, latLng);

	}).then(function(weatherInformation) {

		// Log information to console
		console.log(weatherInformation);

	}).catch(function(error) {
		console.log(error);
	});
} else {

	// IP Address lookup for their geocoordinates
	location().then(function(location) {

		// Get Weather Information from that geolocation
		return weather(location.city, location.loc);
	}).then(function(weatherInformation) {

		// Get Weather Information from that geolocation
		console.log(weatherInformation);
		
	}).catch(function(error) {
		console.log(error);
	});
}