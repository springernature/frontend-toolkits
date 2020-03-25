import {Expander} from '../js/expander';

/**
 * Constants
 */

const className = {
	HIDE: 'u-js-hide',
	OPEN: 'is-open'
};

const createKeydownEvent = key => {
	const event = new Event('keydown', {
		bubbles: true
	});

	switch (key) {
		case 'Enter':
			event.key = 'Enter';
			break;
		case 'Space':
			event.key = 'Space';
			break;
		case 'Escape':
			event.key = 'Escape';
			break;
		case 'Tab':
			event.key = 'Tab';
			break;
		default:
			throw new Error('key should be "Enter", "Space, "Escape" or "Tab"');
	}

	return event;
};

describe('Expander', () => {
	const element = {};

	beforeEach(() => {
		document.body.innerHTML = `
			<button data-expander data-expander-target="#unique">Expander</button>
			<div id="unique" class=${className.HIDE}>
				<a href="#">Tabbable element</a>
			</div>
		`;

		element.BUTTON = document.querySelector('button');
		element.TARGET = document.querySelector('div');
	});

	describe('Expander Class Definition', () => {
		/**
		 * Helpers
		 */
		const clickButtonTwice = () => {
			for (let i = 0; i < 2; i++) {
				element.BUTTON.click();
			}
		};

		const pressEnterKeyTwice = () => {
			for (let i = 0; i < 2; i++) {
				const keydownEnterEvent = createKeydownEvent('Enter');
				element.BUTTON.dispatchEvent(keydownEnterEvent);
			}
		};

		const pressSpaceKeyTwice = () => {
			for (let i = 0; i < 2; i++) {
				const keydownEnterEvent = createKeydownEvent('Space');
				element.BUTTON.dispatchEvent(keydownEnterEvent);
			}
		};

		test('Should open when button is clicked', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			// When
			element.BUTTON.click();
			// Then
			expect(element.BUTTON.classList.contains(className.OPEN)).toBe(true);
			expect(element.TARGET.classList.contains(className.HIDE)).toBe(false);
		});

		test('Should open when enter key is pressed', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			// When
			const keydownEnterEvent = createKeydownEvent('Enter');
			element.BUTTON.dispatchEvent(keydownEnterEvent);
			// Then
			expect(element.BUTTON.classList.contains(className.OPEN)).toBe(true);
			expect(element.TARGET.classList.contains(className.HIDE)).toBe(false);
		});

		test('Should open when space key is pressed', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			// When
			const keydownEnterEvent = createKeydownEvent('Space');
			element.BUTTON.dispatchEvent(keydownEnterEvent);
			// Then
			expect(element.BUTTON.classList.contains(className.OPEN)).toBe(true);
			expect(element.TARGET.classList.contains(className.HIDE)).toBe(false);
		});

		test('Should close when button is clicked a second time', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			// When
			clickButtonTwice();
			// Then
			expect(element.BUTTON.classList.contains(className.OPEN)).toBe(false);
			expect(element.TARGET.classList.contains(className.HIDE)).toBe(true);
		});

		test('Should close when enter key is pressed a second time', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			// When
			pressEnterKeyTwice();
			// Then
			expect(element.BUTTON.classList.contains(className.OPEN)).toBe(false);
			expect(element.TARGET.classList.contains(className.HIDE)).toBe(true);
		});

		test('Should close when space key is pressed a second time', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			// When
			pressSpaceKeyTwice();
			// Then
			expect(element.BUTTON.classList.contains(className.OPEN)).toBe(false);
			expect(element.TARGET.classList.contains(className.HIDE)).toBe(true);
		});

		test('Should set aria attributes when button is clicked', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			element.BUTTON.setAttribute('aria-expanded', 'false');
			element.TARGET.setAttribute('aria-hidden', 'true');
			// When
			element.BUTTON.click();
			// Then
			expect(element.BUTTON.getAttribute('aria-expanded')).toBe('true');
			expect(element.TARGET.getAttribute('aria-hidden')).toBe('false');
		});

		test('Should set aria attributes when enter key is pressed', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			element.BUTTON.setAttribute('aria-expanded', 'false');
			element.TARGET.setAttribute('aria-hidden', 'true');
			// When
			const keydownEnterEvent = createKeydownEvent('Enter');
			element.BUTTON.dispatchEvent(keydownEnterEvent);
			// Then
			expect(element.BUTTON.getAttribute('aria-expanded')).toBe('true');
			expect(element.TARGET.getAttribute('aria-hidden')).toBe('false');
		});

		test('Should unset aria attributes when button is clicked a second time', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			element.BUTTON.setAttribute('aria-expanded', 'false');
			element.TARGET.setAttribute('aria-hidden', 'true');
			// When
			clickButtonTwice();
			// Then
			expect(element.BUTTON.getAttribute('aria-expanded')).toBe('false');
			expect(element.TARGET.getAttribute('aria-hidden')).toBe('true');
		});

		test('Should unset aria attributes when enter key is pressed a second time', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			element.BUTTON.setAttribute('aria-expanded', 'false');
			element.TARGET.setAttribute('aria-hidden', 'true');
			// When
			pressEnterKeyTwice();
			// Then
			expect(element.BUTTON.getAttribute('aria-expanded')).toBe('false');
			expect(element.TARGET.getAttribute('aria-hidden')).toBe('true');
		});

		test('Should unset aria attributes when space key is pressed a second time', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			element.BUTTON.setAttribute('aria-expanded', 'false');
			element.TARGET.setAttribute('aria-hidden', 'true');
			// When
			pressSpaceKeyTwice();
			// Then
			expect(element.BUTTON.getAttribute('aria-expanded')).toBe('false');
			expect(element.TARGET.getAttribute('aria-hidden')).toBe('true');
		});

		test('Should make target element focusable and focus on it when button is clicked', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			// When
			element.BUTTON.click();
			// Then
			expect(element.TARGET).toEqual(document.activeElement);
		});

		test('Should make target element focusable and focus on it when enter key is pressed', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			// When
			const keydownEnterEvent = createKeydownEvent('Enter');
			element.BUTTON.dispatchEvent(keydownEnterEvent);
			// Then
			expect(element.TARGET).toEqual(document.activeElement);
		});

		test('Should close when click off the target', () => {
			// Given
			const outsideElement = document.createElement('div');
			element.TARGET.parentNode.insertBefore(outsideElement, element.TARGET.nextSibling);
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			element.BUTTON.click();
			// When
			outsideElement.click();
			// Then
			expect(element.BUTTON.classList.contains(className.OPEN)).toBe(false);
			expect(element.TARGET.classList.contains(className.HIDE)).toBe(true);
		});

		test('Should close and set focus on trigger when tab out of the target', done => {
			// Given
			const outsideElement = document.createElement('div');
			outsideElement.setAttribute('tabindex', '-1');
			element.TARGET.parentNode.insertBefore(outsideElement, element.TARGET.nextSibling);
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			element.BUTTON.click();
			outsideElement.focus();
			// When
			const keydownTabEvent = createKeydownEvent('Tab');
			element.TARGET.dispatchEvent(keydownTabEvent);
			// Then
			window.requestAnimationFrame(() => {
				expect(element.BUTTON.classList.contains(className.OPEN)).toBe(false);
				expect(element.TARGET.classList.contains(className.HIDE)).toBe(true);
				done();
			});
		});

		test('Should not close when click on the open target', () => {
			// Given
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			element.BUTTON.click();
			// When
			element.TARGET.click();
			// Then
			expect(element.BUTTON.classList.contains(className.OPEN)).toBe(true);
			expect(element.TARGET.classList.contains(className.HIDE)).toBe(false);
		});

		test('Should not close when click on a child of the open target', () => {
			// Given
			const targetChild = document.createElement('div');
			element.TARGET.appendChild(targetChild);
			const expander = new Expander(element.BUTTON, element.TARGET);
			expander.init();
			element.BUTTON.click();
			// When
			targetChild.click();
			// Then
			expect(element.BUTTON.classList.contains(className.OPEN)).toBe(true);
			expect(element.TARGET.classList.contains(className.HIDE)).toBe(false);
		});

		test('Should use TARGET_HIDE_CLASS option if it is passed to constructor', () => {
			// Given
			const targetHideClassOption = 'new-target-hide-class';
			element.TARGET.className = targetHideClassOption;
			const expander = new Expander(element.BUTTON, element.TARGET, {
				TARGET_HIDE_CLASS: targetHideClassOption
			});
			expander.init();
			// When
			element.BUTTON.click();
			// Then
			expect(element.TARGET.classList.contains(targetHideClassOption)).toBe(false);
		});

		test('Should use TRIGGER_OPEN_CLASS option if it is passed to constructor', () => {
			// Given
			const triggerOpenClassOption = 'new-trigger-open-class';
			const expander = new Expander(element.BUTTON, element.TARGET, {
				TRIGGER_OPEN_CLASS: triggerOpenClassOption
			});
			expander.init();
			// When
			element.BUTTON.click();
			// Then
			expect(element.BUTTON.classList.contains(triggerOpenClassOption)).toBe(true);
		});

		test('Should use TRIGGER_OPEN_LABEL option if it is passed to constructor', () => {
			// Given
			const triggerOpenLabelOption = 'new-trigger-open-label';
			const expander = new Expander(element.BUTTON, element.TARGET, {
				TRIGGER_OPEN_LABEL: triggerOpenLabelOption
			});
			expander.init();
			// When
			element.BUTTON.click();
			// Then
			expect(element.BUTTON.textContent).toEqual(triggerOpenLabelOption);
		});

		test('Should close target if target is clocked off if CLOSE_ON_FOCUS_OUT option used', () => {
			// Given
			const clickOffElement = document.createElement('div');
			element.TARGET.parentNode.insertBefore(clickOffElement, element.TARGET.nextSibling);
			const expander = new Expander(element.BUTTON, element.TARGET, {
				CLOSE_ON_FOCUS_OUT: false
			});
			expander.init();
			element.BUTTON.click();
			// When
			clickOffElement.click();
			// Then
			expect(element.TARGET.classList.contains(className.HIDE)).toBe(false);
		});

		test('Should use AUTOFOCUS option if it is passed to constructor', () => {
			// Given
			element.TARGET.innerHTML = '<input type="text" value="value">';
			const expander = new Expander(element.BUTTON, element.TARGET, {
				AUTOFOCUS: true
			});
			expander.init();
			// When
			element.BUTTON.click();
			// Then
			const input = element.TARGET.querySelector('input');
			expect(input).toEqual(document.activeElement);
			expect(input.selectionStart === 0).toBe(true);
			expect(input.selectionEnd === input.value.length).toBe(true);
		});
	});
});

