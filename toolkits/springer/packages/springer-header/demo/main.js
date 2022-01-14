(function () {
	const searchLink = document.querySelector('.c-header__search-link');
	const searchForm = document.querySelector('.c-header__search-form');
	const searchInput = document.querySelector('.c-header__search-controls input');

	searchForm.classList.remove('c-header__search-form--no-js');
	searchForm.hidden = true;

	searchLink.addEventListener('click', event => {
		event.preventDefault();
		searchForm.classList.add('c-header__search-form--visible');
		searchInput.focus();
	});
})();
