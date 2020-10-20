import {Popup} from '../js/popup';

let trigger;

function getCloseBtn() {
	return document.querySelector('.c-popup__close');
}

describe('Global Popup: popup.js', () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<span data-test-trigger></span>
			<div id="popupContent1" class="c-popup">
				<p>Some popup text</p>
			</div>
		`;
		trigger = document.querySelector('[data-test-trigger]');
	});

	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	it('should build a popup that includes the arrow and close button html', () => {
		new Popup(trigger, 'popupContent1');

		trigger.click();

		expect(document.querySelector('.c-popup__arrow')).not.toBe(null);
		expect(document.querySelector('.c-popup__close')).not.toBe(null);
	});

	it('should calculate number values for popup positioning', done => {
		const popup = new Popup(trigger, 'popupContent1');
		const spy = jest.spyOn(popup, '_calcPositioning');
		trigger.click();

		// mock global expander's sending of event
		const event = new CustomEvent('globalExpander:open');
		trigger.dispatchEvent(event);

		setTimeout(() => {
			expect(spy).toHaveBeenCalled();
			expect(typeof spy.mock.results[0].value.top).toBe('number');
			done();
		},100)

	});

	it('should close the popup if close button clicked', () => {
		new Popup(trigger, 'popupContent1');

		trigger.click();

		expect(document.querySelector('.is-open')).not.toBe(null);

		const closeBtn = getCloseBtn();
		closeBtn.click();

		expect(document.querySelector('.is-open')).toBe(null);

	});

	it('should close the popup if a keyboard user presses space on close button', () => {
		new Popup(trigger, 'popupContent1');

		trigger.click();

		expect(document.querySelector('.is-open')).not.toBe(null);

		const closeBtn = getCloseBtn();
		const event = new KeyboardEvent('keydown', {key: ' '});
		closeBtn.dispatchEvent(event);

		expect(document.querySelector('.is-open')).toBe(null);

	});

	it('should close the popup if a keyboard user presses enter on close button', () => {
		new Popup(trigger, 'popupContent1');

		trigger.click();

		expect(document.querySelector('.is-open')).not.toBe(null);

		const closeBtn = getCloseBtn();
		const event = new KeyboardEvent('keydown', {key: 'Enter'});
		closeBtn.dispatchEvent(event);

		expect(document.querySelector('.is-open')).toBe(null);

	});

	it('should close the popup if a keyboard user presses enter on close button', () => {
		new Popup(trigger, 'popupContent1');

		trigger.click();

		expect(document.querySelector('.is-open')).not.toBe(null);

		const closeBtn = getCloseBtn();
		const event = new KeyboardEvent('keydown', {key: 'Enter'});
		closeBtn.dispatchEvent(event);

		expect(document.querySelector('.is-open')).toBe(null);

	});

	it('should close the popup if a keyboard user presses escape inside popup', () => {
		new Popup(trigger, 'popupContent1');

		trigger.click();

		expect(document.querySelector('.is-open')).not.toBe(null);

		const event = new KeyboardEvent('keydown', {key: 'Escape'});
		document.querySelector('#popupContent1').dispatchEvent(event);

		expect(document.querySelector('.is-open')).toBe(null);

	});

	it('should close the popup if window resized', () => {
		new Popup(trigger, 'popupContent1');

		trigger.click();

		// mock global expander's sending of event
		const event = new CustomEvent('globalExpander:open');
		trigger.dispatchEvent(event);

		expect(document.querySelector('.is-open')).not.toBe(null);

		const windowEvent = new Event('resize');
		window.dispatchEvent(windowEvent);

		expect(document.querySelector('.is-open')).toBe(null);

	});

	it('should close one popup when another opens', () => {
		const html = document.createElement('div');
		html.innerHTML = `
			<span data-test-trigger-2></span>
			<div id="popupContent2">
				<p>Some popup text</p>
			</div>
		`;
		document.body.appendChild(html);

		const trigger2 = document.querySelector('[data-test-trigger-2]');
		new Popup(trigger, 'popupContent1');
		new Popup(trigger2, 'popupContent2');

		trigger.click();
		expect(trigger.classList.contains('is-open')).toBe(true);

		trigger2.click();

		expect(trigger.classList.contains('is-open')).toBe(false);
	});

	it('should set css style if passed in as option', done => {
		new Popup(trigger, 'popupContent1', { MAX_WIDTH: "600px" });

		trigger.click();

		// mock global expander's sending of event
		const event = new CustomEvent('globalExpander:open');
		trigger.dispatchEvent(event);

		setTimeout(() => {
			const popup = document.querySelector('.c-popup');
			expect(popup.style.maxWidth).toBe("600px");
			done();
		},100)
	});
});
