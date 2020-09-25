const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

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
		title: 'Weather App',
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
		msg: 'Need any help. Mail me - "tashfiqahmedemon1@gmail.com"',
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

		forecast(latitude, longtitude, (error, { temp, feelslike, weather_descriptions } = {}) => {
			if (error) {
				return res.send({ error });
			}

			res.send({
				location: location,
				temperature: temp,
				feelslike: feelslike,
				weatehr: weather_descriptions
			});
		});
	});

	// res.send({
	// 	forcasting: 'It is raining',
	// 	location: 'Naogaon',
	// 	address: req.query.address,
	// 	temp: temperature
	// });
});

// app.get('/products', (req, res) => {
// 	if (!req.query.search) {
// 		return res.send({
// 			error: 'You must provide a search term'
// 		});
// 	}

// 	console.log(req.query.search);
// 	res.send({
// 		product: []
// 	});
// });

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

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
