import {makeArray} from '@springernature/global-context/js/helpers';
import {createDropdown} from '@springernature/springer-dropdown/js/create-dropdown';

const createMenuDropdown = menu => {
	menu.classList.add('u-hide-at-lt-lg');

	const items = menu.querySelectorAll('li');
	const links = makeArray(items).map(item => item.querySelector('a'));

	const dropdownEl = createDropdown({
		BUTTON_TEXT: 'Menu',
		LINKS: links,
		DROPDOWN_OPTIONS: {
			BUTTON_CLASS: 'c-header__item',
			DROPDOWN_CLASS: 'u-hide-at-lg',
			MENU_POSITION: 'right'
		}
	});

	menu.parentNode.insertBefore(dropdownEl, menu.nextSibling);
};

const enhancedMenu = () => {
	const menu = document.querySelector('[data-enhanced-menu]');

	if (!menu) {
		return;
	}

	createMenuDropdown(menu);
};

export {enhancedMenu};
