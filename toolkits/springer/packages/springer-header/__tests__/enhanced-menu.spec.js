import {createDropdown} from '@springernature/springer-dropdown/js/create-dropdown';
import {enhancedMenu} from '../js/enhanced-menu';

describe('Enhanced Menu', () => {
	const element = {};

	beforeEach(() => {
		document.body.innerHTML = `
			<ul class="c-header__menu" data-enhanced-menu>
				<li class="c-header__item"><a class="c-header__link" href="#link1">Menu item 1</a></li>
				<li class="c-header__item"><a class="c-header__link" href="#link2">Menu item 2</a></li>
				<li class="c-header__item"><a class="c-header__link" href="#link3">Menu item 3</a></li>
			</ul>
		`;

		element.MENU = document.querySelector('[data-header-menu]');
	});

	test('Should return if no header menu element', () => {
		// Given
		document.body.innerHTML = '';
		// When
		enhancedMenu();
		// Then
		expect(createDropdown).toHaveBeenCalledTimes(0);
	});

	test('Should create a dropdown menu with items from the menu', () => {
		// When
		enhancedMenu();
		// Then
		const passedOptions = createDropdown.mock.calls[0][0];
		const buttonTextOption = passedOptions.BUTTON_TEXT;
		const linksOption = passedOptions.LINKS;
		const dropdownOptions = passedOptions.DROPDOWN_OPTIONS;

		expect(createDropdown).toHaveBeenCalledTimes(1);
		expect(buttonTextOption).toEqual('Menu');
		expect(linksOption[0].textContent).toEqual('Menu item 1');
		expect(linksOption[1].textContent).toEqual('Menu item 2');
		expect(linksOption[2].textContent).toEqual('Menu item 3');
		expect(dropdownOptions).toEqual({
			BUTTON_CLASS: 'c-header__item',
			DROPDOWN_CLASS: 'u-hide-at-lg',
			MENU_POSITION: 'right'
		});
	});
});
