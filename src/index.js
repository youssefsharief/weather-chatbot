const callWeatherApi = require('./weather_api')

console.log('Loading function');

exports.handler =  (event, context, callback) => {
	console.log(JSON.stringify(event))
	console.log(JSON.stringify(event.result))
	let city = event.result.parameters['geo-city']; // city is a required param

	// Get the date for the weather forecast (if present)
	let date = event.result.parameters['date'] || '';
	console.log('Date: ' + date || 'today');

	// Call the weather API
	callWeatherApi(city, date).then((output) => {
		callback(null, { speech: output, displayText:output }); // Return the results of the weather API to Dialogflow
	}).catch(() => {
		const resp = `I don't know the weather but I hope it's good!`
		callback(null, { speech: resp, displayText:resp });
	});
}

	
