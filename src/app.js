const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		header: 'Weather',
		name: 'Tashfiq Ahmed Emon'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		header: 'About Page!',
		title: 'About Me',
		name: 'Tashfiq Ahmed Emon'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		header: 'Help',
		msg: 'Need any help or query. Mail me on - "tashfiqahmedemon1@gmail.com"',
		name: 'Tashfiq Ahmed Emon'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		});
	}

	geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
		if (error) {
			return res.send({
				error
			});
		}

		forecast(
			latitude,
			longtitude,
			(
				error,
				{ timezone_id, localtime, temperature, feelslike, humidity, wind_speed, weather_descriptions } = {}
			) => {
				if (error) {
					return res.send({ error });
				}

				res.send({
					location,
					timezone_id,
					localtime,
					temperature,
					feelslike,
					humidity,
					wind_speed,
					weather: weather_descriptions
				});
			}
		);
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Help article not found',
		name: 'Emon'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page Not Found',
		name: 'Emon'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
