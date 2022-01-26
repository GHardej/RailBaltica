const nav = document.querySelector('.nav');
const navItemsHover = document.querySelectorAll('.nav__item-hover');
const btnIcon = document.querySelector('.btn');

console.log(navItemsHover);

const handleNav = () => {
	nav.classList.toggle('nav--active');

	navItemsHover.forEach((navItem) => {
		navItem.classList.toggle('nav__item-hover');
	});
};

btnIcon.addEventListener('click', handleNav);
