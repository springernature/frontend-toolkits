import {dropdown} from '../../js';
import {Dropdown} from '../../js/dropdown';
import {constants} from '../../js/constants';

/**
 * Local Constants
 */

const selector = {
	DROPDOWN: `.${constants.DROPDOWN}`,
	BUTTON: `.${constants.BUTTON}`,
	MENU: `.${constants.MENU}`
};

const defaultOptions = {
	BUTTON_CLASS: '',
	CLICK_OUTSIDE: true,
	DROPDOWN_CLASS: '',
	HIDE_CLASS: 'u-hide',
	HIDE_INITIALLY: true,
	MENU_POSITION: 'left'
};

describe('springer-dropdown', () => {
	let element = {};

	beforeEach(() => {
		document.body.innerHTML = `
			<div class="c-dropdown">
				<button class="c-dropdown__button" aria-expanded="false" data-dropdown>Click me</button>
				<ul class="c-dropdown__menu">
					<li class="c-dropdown__item">
						<a class="c-dropdown__link" href="#">Item 1</a>
					</li>
					<li class="c-dropdown__item">
						<a class="c-dropdown__link" href="#">Item 2</a>
					</li>
					<li class="c-dropdown__item">
						<a class="c-dropdown__link" href="#">Item 3</a>
					</li>
				</ul>
			</div>
		`;

		element.BUTTON = document.querySelector(selector.BUTTON);
		element.DROPDOWN = document.querySelector(selector.DROPDOWN);
		element.MENU = element.DROPDOWN.querySelector(selector.MENU);
	});

	describe('Dropdown class', () => {
		/**
		 * Helpers
		 */
		const clickButtonTwice = () => {
			for (let i = 0; i < 2; i++) {
				element.BUTTON.click();
			}
		};

		test('Should initially add HIDE_CLASS className to menu', () => {
			// When
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();

			// Then
			expect(element.MENU.classList.contains(defaultOptions.HIDE_CLASS)).toBe(true);
		});

		test('Should remove HIDE_CLASS className from menu when button is clicked', () => {
			// Given
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();

			// When
			element.BUTTON.click();

			// Then
			expect(element.MENU.classList.contains(defaultOptions.HIDE_CLASS)).toBe(false);
		});

		test('Should add "show" modifier className to dropdown when button is clicked', () => {
			// Given
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();

			// When
			element.BUTTON.click();

			// Then
			expect(element.DROPDOWN.classList.contains(constants.DROPDOWN_OPEN_MODIFIER)).toBe(true);
		});

		test('Should add HIDE_CLASS className from menu when button is clicked a second time', () => {
			// Given
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();

			// When
			clickButtonTwice();

			// Then
			expect(element.MENU.classList.contains(defaultOptions.HIDE_CLASS)).toBe(true);
		});

		test('Should remove "show" modifier className from dropdown when button is clicked a second time', () => {
			// Given
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();

			// When
			clickButtonTwice();

			// Then
			expect(element.DROPDOWN.classList.contains(constants.DROPDOWN_OPEN_MODIFIER)).toBe(false);
		});

		test('Should set aria-expanded attribute to "true" on button when button is clicked', () => {
			// Given
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();

			// When
			element.BUTTON.click();

			// Then
			expect(element.BUTTON.getAttribute('aria-expanded')).toBe('true');
		});

		test('Should set aria-expanded attribute to "false" on button when button is clicked a second time', () => {
			// Given
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();

			// When
			clickButtonTwice();

			// Then
			expect(element.BUTTON.getAttribute('aria-expanded')).toBe('false');
		});

		test('Should remove "show" modifier className from dropdown when an element outside of the dropdown is clicked', () => {
			// Given
			const outsideElement = document.createElement('div');
			element.DROPDOWN.parentNode.insertBefore(outsideElement, element.DROPDOWN.nextSibling);
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();
			element.BUTTON.click();

			// When
			outsideElement.click();

			// Then
			expect(element.DROPDOWN.classList.contains(constants.DROPDOWN_OPEN_MODIFIER)).toBe(false);
		});
	});

	describe('keyboard interaction', () => {
		/**
		 * Helpers
		 */
		const createKeydownEvent = key => {
			const event = new Event('keydown');

			switch (key) {
				case 'Enter':
					event.key = 'Enter';
					break;
				case 'Escape':
					event.key = 'Escape';
					break;
				case 'Tab':
					event.key = 'Tab';
					break;
				default:
					// eslint-disable-next-line no-console
					throw new Error(`${key} was should be 'Enter' or 'Escape'`);
			}

			return event;
		};

		test('Should add "show" modifier className to dropdown when enter key is pressed on a button', () => {
			// Given
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();

			// When
			const keydownEnterEvent = createKeydownEvent('Enter');
			element.BUTTON.dispatchEvent(keydownEnterEvent);

			// Then
			expect(element.DROPDOWN.classList.contains(constants.DROPDOWN_OPEN_MODIFIER)).toBe(true);
		});

		test('Should remove "show" modifier className from dropdown when enter key is pressed on a button', () => {
			// Given
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();

			// When
			for (let i = 0; i < 2; i++) {
				const keydownEnterEvent = createKeydownEvent('Enter');
				element.BUTTON.dispatchEvent(keydownEnterEvent);
			}

			// Then
			expect(element.DROPDOWN.classList.contains(constants.DROPDOWN_OPEN_MODIFIER)).toBe(false);
		});

		test('Should remove "show" modifier className from dropdown when dropdown is shown and escape key is pressed', () => {
			// Given
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();
			const keydownEnterEvent = createKeydownEvent('Enter');
			element.BUTTON.dispatchEvent(keydownEnterEvent);

			// When
			const keyDownEscapeEvent = createKeydownEvent('Escape');
			document.dispatchEvent(keyDownEscapeEvent);

			// Then
			expect(element.DROPDOWN.classList.contains(constants.DROPDOWN_OPEN_MODIFIER)).toBe(false);
		});

		test('Should not remove "show" modifier className from dropdown when focused element is inside of dropdown', done => {
			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();
			const keydownEnterEvent = createKeydownEvent('Enter');
			element.BUTTON.dispatchEvent(keydownEnterEvent);

			// When
			const insideElement = element.MENU.querySelector('li a');
			insideElement.focus();
			const keyDownTabEvent = createKeydownEvent('Tab');
			document.dispatchEvent(keyDownTabEvent);

			// Then
			window.requestAnimationFrame(() => {
				expect(element.DROPDOWN.classList.contains(constants.DROPDOWN_OPEN_MODIFIER)).toBe(true);
				done();
			});
		});

		test('Should remove "show" modifier className from dropdown when focused element is outside of dropdown', done => {
			// Given
			const outsideElement = document.createElement('div');
			outsideElement.tabIndex = 1;
			element.DROPDOWN.parentNode.insertBefore(outsideElement, element.DROPDOWN.nextSibling);

			const dropdown = new Dropdown(element.BUTTON);
			dropdown.init();
			const keydownEnterEvent = createKeydownEvent('Enter');
			element.BUTTON.dispatchEvent(keydownEnterEvent);

			// When
			outsideElement.focus();
			const keyDownTabEvent = createKeydownEvent('Tab');
			document.dispatchEvent(keyDownTabEvent);

			// Then
			window.requestAnimationFrame(() => {
				expect(element.DROPDOWN.classList.contains(constants.DROPDOWN_OPEN_MODIFIER)).toBe(false);
				done();
			});
		});
	});

	describe('data-attribute api', () => {
		/**
		 * Helpers
		 */
		const appendMoreInstances = num => {
			for (let i = 0; i < num; i++) {
				const instance = element.DROPDOWN.cloneNode(true);
				document.body.appendChild(instance);
			}
		};

		beforeEach(() => {
			appendMoreInstances(2);
		});

		test('Should create a new Dropdown instance for every dropdown on the page', () => {
			// Given
			jest.spyOn(Dropdown.prototype, 'init').mockImplementation(() => {});

			// When
			dropdown();

			// Then
			expect(Dropdown.prototype.init).toHaveBeenCalledTimes(3);
		});

		test('Opening one dropdown should not also open another dropdown', () => {
			// Given
			const dropdowns = document.querySelectorAll(selector.DROPDOWN);
			const secondDropdown = dropdowns[1];
			dropdown();

			// When
			element.BUTTON.click();

			// Then
			expect(secondDropdown.classList.contains(constants.DROPDOWN_OPEN_MODIFIER)).toBe(false);
		});
	});

	describe('configuration options', () => {
		describe('via function parameter', () => {
			test('DROPDOWN_CLASS: Should add additional className to dropdown', () => {
				// When
				dropdown({DROPDOWN_CLASS: 'additional-dropdown-class'});

				// Then
				expect(element.DROPDOWN.classList.contains('additional-dropdown-class')).toBe(true);
			});

			test('HIDE_INITIALLY: Should not initially add HIDE_CLASS className to menu when set to false', () => {
				// When
				dropdown({HIDE_INITIALLY: false});

				// Then
				expect(element.MENU.classList.contains(defaultOptions.HIDE_CLASS)).toBe(false);
			});

			test('HIDE_CLASS: Should use value as the className to toggle on the menu', () => {
				// When
				dropdown({HIDE_CLASS: 'new-hide-class'});

				// Then
				expect(element.MENU.classList.contains('new-hide-class')).toBe(true);
			});

			test('CLICK_OUTSIDE: Should not close dropdown when clicking outside the dropdown when set to false', () => {
				// Given
				const outsideElement = document.createElement('div');
				element.DROPDOWN.parentNode.insertBefore(outsideElement, element.DROPDOWN.nextSibling);
				dropdown({CLICK_OUTSIDE: false});
				element.BUTTON.click();

				// When
				outsideElement.click();

				// Then
				expect(element.MENU.classList.contains(defaultOptions.HIDE_CLASS)).toBe(false);
				expect(element.DROPDOWN.classList.contains(constants.DROPDOWN_OPEN_MODIFIER)).toBe(true);
			});

			test('MENU_POSITION: Should add className to set the menu position', () => {
				// When
				dropdown({MENU_POSITION: 'right'});

				// Then
				expect(element.MENU.classList.contains('c-dropdown__menu--right')).toBe(true);
			});
		});

		describe('via data-* attributes', () => {
			test('DROPDOWN_CLASS: Should add additional className to dropdown', () => {
				// Given
				element.BUTTON.setAttribute('data-dropdown-dropdown-class', 'additional-dropdown-class');

				// When
				dropdown();

				// Then
				expect(element.DROPDOWN.classList.contains('additional-dropdown-class')).toBe(true);
			});

			test('HIDE_INITIALLY: Should initially add HIDE_CLASS className to menu', () => {
				// Given
				element.BUTTON.setAttribute('data-dropdown-hide-initially', 'true');

				// When
				dropdown({HIDE_INITIALLY: false});

				// Then
				expect(element.MENU.classList.contains(defaultOptions.HIDE_CLASS)).toBe(true);
			});

			test('HIDE_CLASS: Should use value as the className to toggle on the menu', () => {
				// Given
				element.BUTTON.setAttribute('data-dropdown-hide-class', 'data-hide-class');

				// When
				dropdown({HIDE_CLASS: 'new-hide-class'});

				// Then
				expect(element.MENU.classList.contains('data-hide-class')).toBe(true);
			});

			test('CLICK_OUTSIDE: Should close dropdown when clicking outside the dropdown', () => {
				// Given
				element.BUTTON.setAttribute('data-dropdown-click-outside', 'true');

				const outsideElement = document.createElement('div');
				element.DROPDOWN.parentNode.insertBefore(outsideElement, element.DROPDOWN.nextSibling);
				dropdown({CLICK_OUTSIDE: false});
				element.BUTTON.click();

				// When
				outsideElement.click();

				// Then
				expect(element.MENU.classList.contains(defaultOptions.HIDE_CLASS)).toBe(true);
				expect(element.DROPDOWN.classList.contains(constants.DROPDOWN_OPEN_MODIFIER)).toBe(false);
			});
		});
	});
});
