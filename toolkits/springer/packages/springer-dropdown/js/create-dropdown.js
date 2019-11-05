import {constants} from './constants';
import {Dropdown} from './dropdown';

const createButtonEl = text => {
	const button = document.createElement('button');
	button.textContent = text;
	button.className = constants.BUTTON;
	button.setAttribute('aria-expanded', 'false');
	button.setAttribute('aria-haspopup', 'true');

	return button;
};

const createDropdownEl = (buttonEl, links) => {
	const dropdownEl = document.createElement('div');
	dropdownEl.className = constants.DROPDOWN;

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

	dropdownEl.appendChild(buttonEl);
	dropdownEl.appendChild(menu);

	return dropdownEl;
};

const createDropdown = options => {
	if (!Object.prototype.hasOwnProperty.call(options, 'BUTTON_TEXT') || !Object.prototype.hasOwnProperty.call(options, 'LINKS')) {
		throw new Error('\'BUTTON_TEXT\' and \'LINKS\' are mandatory properties');
	}

	const dropdownOptions = Object.prototype.hasOwnProperty.call(options, 'DROPDOWN_OPTIONS') ? options.DROPDOWN_OPTIONS : {};
	const buttonEl = createButtonEl(options.BUTTON_TEXT);
	const dropdownEl = createDropdownEl(buttonEl, options.LINKS);

	const dropdown = new Dropdown(buttonEl, dropdownOptions);
	dropdown.init();

	return dropdownEl;
};

export {createDropdown};
