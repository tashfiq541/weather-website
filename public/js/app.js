console.log('Client side');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');
const messageSix = document.querySelector('#message-6');
const messageSeven = document.querySelector('#message-7');
const messageEight = document.querySelector('#message-8');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;
	messageOne.textContent = 'loading.....';
	messageTwo.textContent = '';
	messageThree.textContent = '';
	messageFour.textContent = '';
	messageFive.textContent = '';
	messageSix.textContent = '';
	messageEight.textContent = '';
	messageSeven.textContent = '';

	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = `Location: ${data.location}`;
				messageTwo.textContent = `timezone: ${data.timezone_id}`;
				messageThree.textContent = `localtime: ${data.localtime}`;
				messageFour.textContent = `Temperature: ${data.temperature} degree`;
				messageFive.textContent = `Feelslike: ${data.feelslike} degree`;
				messageSix.textContent = `Humidity: ${data.humidity} %`;
				messageSeven.textContent = `wind_speed: ${data.wind_speed} km/h`;
				messageEight.textContent = `Weather Description: ${data.weather}`;
			}
		});
	});
});
