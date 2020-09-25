const request = require('request');

const forecast = (latitude, longtitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=09805cd8c089411d5a4434be55a510e9&query=' +
		latitude +
		',' +
		longtitude;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			callback(undefined, {
				temp: body.current.temperature,
				feelslike: body.current.feelslike,
				weather_descriptions: body.current.weather_descriptions[0]
			});
		}
	});
};

module.exports = forecast;
