const request = require('request');

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1IjoidGFzaGZpcTU0MSIsImEiOiJja2ZnbnF3bHYwYThuMnFwM3R1dGd3ZWNlIn0.j2sq_mAW_Mbug_7y0OAB0g&limit=1';
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try again another search.', undefined);
		} else {
			callback(undefined, {
				longtitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
