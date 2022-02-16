// const actualDay = actualDate.getDate();
// const actualMonth = actualDate.getMonth();
// const actualYear = actualDate.getFullYear();
const nav = document.querySelector('.nav');
const navItemsHover = document.querySelectorAll('.nav__item-hover');
const btnIcon = document.querySelector('.btn');
const weatherDate = document.querySelector('.header__weather-date');
const temperature = document.querySelector('.header__weather-temp');
const weatherPhoto = document.querySelector('.header__weather-photo');
const elapsedDays = document.querySelector('.days-elapsed');
const elapsedDaysPercentage = document.querySelector(
	'.days-elapsed-percentage'
);
const daysToFinish = document.querySelector('.days-to-finish');
const daysToFinishPercentage = document.querySelector(
	'.days-to-finish-percentage'
);

const actualDate = new Date();
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
const startDate = new Date(2020, 05, 27);
const endDate = new Date(2023, 06, 27);
const contractDuration = endDate.getTime() - startDate.getTime();

// contract days calculation
elapsedDays.textContent =
	(
		(actualDate.getTime() - startDate.getTime()) /
		(24 * 60 * 60 * 1000)
	).toFixed() + ' dni ';

elapsedDaysPercentage.textContent =
	'(' +
	(
		((actualDate.getTime() - startDate.getTime()) / contractDuration) *
		100
	).toFixed() +
	'%)';

daysToFinish.textContent =
	(
		(endDate.getTime() - actualDate.getTime() + 24 * 60 * 60 * 1000) /
		(24 * 60 * 60 * 1000)
	).toFixed() + ' dni ';

daysToFinishPercentage.textContent =
	'(' +
	(
		((endDate.getTime() - actualDate.getTime()) / contractDuration) *
		100
	).toFixed() +
	'%)';

// weather API
const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=e98e00972c6e8d5388bb75b96e2d5b48';
const API_UNITS = '&units=metric';

// const URL = 'https://danepubliczne.imgw.pl/api/data/synop/id/12295'
// fetch(URL).then(res => res.json()).then(data => console.log(data))

const getWeather = () => {
	const city = 'Białystok';
	const URL = API_LINK + city + API_KEY + API_UNITS;

	weatherDate.textContent = actualDate.toLocaleDateString('pl-PL', dateOptions);

	fetch(URL)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			const temp = data.main.temp;
			const status = Object.assign({}, ...data.weather);
			console.log(status);

			temperature.textContent = temp.toFixed() + '℃';

			if (status.id >= 200 && status.id < 300) {
				weatherPhoto.setAttribute(
					'src',
					'./img/weather-icons/thunderstorm.png'
				);
			} else if (status.id >= 300 && status.id < 400) {
				weatherPhoto.setAttribute('src', './img/weather-icons/drizzle.png');
			} else if (status.id >= 500 && status.id < 600) {
				weatherPhoto.setAttribute('src', './img/weather-icons/rain.png');
			} else if (status.id >= 600 && status.id < 700) {
				weatherPhoto.setAttribute('src', './img/weather-icons/ice.png');
			} else if (status.id >= 700 && status.id < 800) {
				weatherPhoto.setAttribute('src', './img/weather-icons/fog.png');
			} else if (status.id === 800) {
				weatherPhoto.setAttribute('src', './img/weather-icons/sun.png');
			} else if (status.id > 800 && status.id < 900) {
				weatherPhoto.setAttribute('src', './img/weather-icons/cloud.png');
			} else {
				weatherPhoto.setAttribute('src', './img/weather-icons/unknown.png');
			}
		});
};

getWeather();

// console.log(
// 	actualDate.getDate() +
// 		' ' +
// 		monthsArr[actualDate.getMonth()] +
// 		' ' +
// 		actualDate.getFullYear()
// );

const handleNav = () => {
	nav.classList.toggle('nav--active');

	navItemsHover.forEach((navItem) => {
		navItem.classList.toggle('nav__item-hover');
	});
};

btnIcon.addEventListener('click', handleNav);
