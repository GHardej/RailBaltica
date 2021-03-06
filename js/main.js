const nav = document.querySelector('.nav');
const navItemsHover = document.querySelectorAll('.nav__item-hover');
const btnNav = document.querySelector('.btn');
const btnCTA = document.querySelector('.header__btn');
const weatherDate = document.querySelector('.header__weather-date');
const temperature = document.querySelector('.header__weather-temp');
const weatherPhoto = document.querySelector('.header__weather-photo');

// contract days calculation
const barDaysElapsed = document.querySelector('.progress__bar-days-elapsed');
const daysElapsedPercentageInfo = document.querySelector(
	'.progress__bar-days-elapsed-percentage'
);
const progressInfo = document.querySelector('.progress__info');
const daysElapsedInfo = document.querySelector('.progress__info-days-elapsed');
const daysToFinishInfo = document.querySelector(
	'.progress__info-days-to-finish'
);

const actualDate = new Date();
const startDate = new Date(2020, 05, 27);
const endDate = new Date(2023, 06, 27);
const contractDuration = endDate.getTime() - startDate.getTime();

const elapsedDays = Math.ceil(
	(actualDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
);
const daysElapsedPercentage = Math.round(
	((actualDate.getTime() - startDate.getTime()) / contractDuration) * 100
);
const daysToFinish = Math.ceil(
	(endDate.getTime() - actualDate.getTime() + 24 * 60 * 60 * 1000) /
		(24 * 60 * 60 * 1000)
);

barDaysElapsed.style.width = daysElapsedPercentage + '%';
progressInfo.style.width = daysElapsedPercentage + '%';

daysElapsedInfo.textContent = elapsedDays;
daysToFinishInfo.textContent = daysToFinish;
daysElapsedPercentageInfo.textContent = daysElapsedPercentage + '%';

// weather API
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
weatherDate.textContent = actualDate.toLocaleDateString('pl-PL', dateOptions);

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=e98e00972c6e8d5388bb75b96e2d5b48';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = 'Białystok';
	const URL = API_LINK + city + API_KEY + API_UNITS;

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

// activate/desactivate menu
const handleNav = () => {
	nav.classList.toggle('nav--active');

	navItemsHover.forEach((navItem) => {
		navItem.classList.toggle('nav__item-hover');
	});
};

// CTA button onclick functions
const btnClick = () => {
	btnCTA.classList.add('header__btn--click');
};
const btnRelease = () => {
	btnCTA.classList.remove('header__btn--click');
};

// listeners

btnCTA.addEventListener('mousedown', btnClick);
btnCTA.addEventListener('mouseup', btnRelease);

btnNav.addEventListener('click', handleNav);
