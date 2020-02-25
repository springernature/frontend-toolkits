import {constants} from './constants';
import {Dropdown} from './dropdown';

const createButtonElement = text => {
	const button = document.createElement('button');
	button.textContent = text;
	button.className = constants.BUTTON;
	button.setAttribute('aria-expanded', 'false');
	button.setAttribute('aria-haspopup', 'true');

	return button;
};

const createDropdownElement = (buttonElement, links) => {
	const dropdownElement = document.createElement('div');
	dropdownElement.className = constants.DROPDOWN;

	const menu = document.createElement('ul');
	menu.className = constants.MENU;

	links.forEach(link => {
		if (link.tagName === 'A') {
			const li = document.createElement('li');
			li.className = constants.ITEM;

			const a = document.createElement('a');
			a.className = constants.LINK;
			a.href = link.href;
			a.textContent = link.textContent;

			li.appendChild(a);
			menu.appendChild(li);
		} else {
			throw new Error(`Expected an array of links but received an array containing ${link.tagName}`);
		}
	});

	dropdownElement.appendChild(buttonElement);
	dropdownElement.appendChild(menu);

	return dropdownElement;
};

const createDropdown = options => {
	if (!Object.prototype.hasOwnProperty.call(options, 'BUTTON_TEXT') || !Object.prototype.hasOwnProperty.call(options, 'LINKS')) {
		throw new Error('\'BUTTON_TEXT\' and \'LINKS\' are mandatory properties');
	}

	const dropdownOptions = Object.prototype.hasOwnProperty.call(options, 'DROPDOWN_OPTIONS') ? options.DROPDOWN_OPTIONS : {};
	const buttonElement = createButtonElement(options.BUTTON_TEXT);
	const dropdownElement = createDropdownElement(buttonElement, options.LINKS);

	const dropdown = new Dropdown(buttonElement, dropdownOptions);
	dropdown.init();

	return dropdownElement;
};

export {createDropdown};
