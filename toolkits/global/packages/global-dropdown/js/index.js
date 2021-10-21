/* eslint no-use-before-define: ["error", { "functions": false, "variables": false }] */

const actions = {
	ESC: ['Escape', 'Esc', 27],
	UP: ['ArrowUp', 38],
	DOWN: ['ArrowDown', 40]
};

let dropdownButtons;
let dropdownItems;

const normaliseKeyEvent = event => event.key || event.keyCode;

const keyEventIsInAction = (event, targetAction) => targetAction.includes(normaliseKeyEvent(event));

const escapekeyCloseDropdown = event => {
	if (keyEventIsInAction(event, actions.ESC)) {
		dropdownButtons.forEach(button => {
			closeDropdown(button);
			button.focus();
		});
	}
};

const closeDropdown = button => {
	button.setAttribute('aria-expanded', 'false');
	button.nextElementSibling.style.display = 'none';
	button.querySelector('svg').style.transform = null;
	document.removeEventListener('keydown', escapekeyCloseDropdown);
};

const openDropdown = button => {
	button.setAttribute('aria-expanded', 'true');
	button.nextElementSibling.style.display = null;
	button.querySelector('svg').style.transform = 'rotate(180deg)';
	button.nextElementSibling.querySelector('[data-dropdown-item]').focus();
	document.addEventListener('keydown', escapekeyCloseDropdown);
};

const toggleDropdown = button => {
	if (button.getAttribute('aria-expanded') === 'false') {
		openDropdown(button);
	}	else if (button.getAttribute('aria-expanded') === 'true') {
		closeDropdown(button);
	}
};

const handleUpArrow = (index, event) => {
	if (keyEventIsInAction(event, actions.UP)) {
		event.preventDefault();
		if (index === 0) {
			dropdownItems[dropdownItems.length - 1].focus();
		}	else {
			dropdownItems[index - 1].focus();
		}
	}
};

const handleDownArrow = (index, event) => {
	if (keyEventIsInAction(event, actions.DOWN)) {
		event.preventDefault();
		if (index === dropdownItems.length - 1) {
			dropdownItems[0].focus();
		}	else {
			dropdownItems[index + 1].focus();
		}
	}
};

const init = (dropdownSelector = '[data-dropdown]', itemSelector = '[data-dropdown-item]') => {
	dropdownButtons = [...document.querySelectorAll(dropdownSelector)];
	dropdownItems = [...document.querySelectorAll(itemSelector)];

	[...document.querySelectorAll('.c-dropdown__menu')].forEach(dropdown => {
		dropdown.style.display = 'none';
	});

	dropdownButtons.forEach(button => {
		button.addEventListener('click', toggleDropdown.bind(null, button));
	});

	document.addEventListener('keyup', function () {
		if (!document.activeElement.matches('[data-dropdown-item]')) {
			dropdownButtons.forEach(button => {
				closeDropdown(button);
			});
		}
	});

	dropdownItems.forEach((item, index) => {
		item.addEventListener('keydown', event => {
			handleUpArrow(index, event);
			handleDownArrow(index, event);
		});
	});
};

export default init;
