console.log('Client side');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');
const messageSeven = document.querySelector('#message-7');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;
	messageOne.textContent = 'loading.....';
	messageTwo.textContent = '';
	messageThree.textContent = '';
	messageFour.textContent = '';
	messageFive.textContent = '';
	messageSeven.textContent = '';

	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				// messageOne.textContent = `Location: ${data.location}`;
				// messageTwo.textContent = `Temperature: ${data.temperature}`;
				// messageThree.textContent = `Feelslike: ${data.feelslike}`;
				// messageFour.textContent = `Weather Description: ${data.weatehr}`;
				// messageFive.textContent = `Weather Description: ${data.weatehr}`;
				// messageSix.textContent = `Weather Description: ${data.weatehr}`;
				// messageSeven.textContent = `Weather Description: ${data.weatehr}`;

				messageOne.textContent = `Location: ${data.location}`;
				messageTwo.textContent = `timezone: ${data.timezone_id}`;
				messageThree.textContent = `localtime: ${data.localtime}`;
				messageFour.textContent = `Temperature: ${data.temperature} degree`;
				messageFive.textContent = `Feelslike: ${data.feelslike} degree`;
				messageSeven.textContent = `Weather Description: ${data.weather}`;
			}
		});
	});
});
