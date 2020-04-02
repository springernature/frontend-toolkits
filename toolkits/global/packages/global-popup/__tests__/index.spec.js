import {Popup} from '../js/index.js';

describe('Popup', () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<span data-popup data-popup-target="popupContent1"></span>
			<div id="popupContent1" class="c-popup">
				<p>Some popup text</p>
			</div>			
		`
	});

	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	it('should build a popup that includes the arrow and close button html', () => {
		const popup = new Popup('c-popup');
		popup.init();

		expect(document.querySelector('.c-popup__arrow')).toBeTruthy();
		expect(document.querySelector('.c-popup__close')).toBeTruthy();
	});

	it('should position the popup above the trigger by default', () => {

	});

	it('should position the popup below the trigger if not enough space in viewport', () => {

	});

	it('should move focus back to trigger if user tabs beyond last element in popup', () => {

	});

	it('should close the popup if a keyboard user focuses on the close button and presses space', () => {

	});

	it('should close one popup when another opens', () => {

	});

	it('should stop event propagation on toggle', () => {

	});

	it('should close the popup if the user clicks out of it', () => {
		// this should be covered by using global expander component
	});

	it('should close the popup if the user clicks the close button', () => {
		// this should be covered by using global expander component
	});

	it('should close the popup if a keyboard user presses escape', () => {
		// this should be covered by using global expander component - needs to be added to ge
	});

	it('should focus the first link in the content', () => {
		// this should be covered by using global expander component
	});

	it('should allow the focus target be overridden', () => {
		// this should be covered by using global expander component - needs to be added to ge
	});
});
