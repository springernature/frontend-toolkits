import {popup} from '../js/index';
import {Popup} from '../js/popup';

jest.mock('../js/popup');

describe('Global Popup: index.js (Data Attribute API)', () => {
	beforeEach(() => {
		Popup.mockClear();

		document.body.innerHTML = `
			<span data-popup data-popup-target="popupContent1"></span>
			<div id="popupContent1">
				<p>Some popup text</p>
			</div>			
		`
	});

	afterEach(() => {
		document.getElementsByTagName('html')[0].innerHTML = '';
	});

	it('should instantiate Popup if correct data attributes exist', () => {
		// When
		popup();

		// Then
		expect(Popup).toHaveBeenCalled();
	});

	it('should instantiate multiple Popups', () => {
		// Given
		const div = document.createElement('div');
		div.innerHTML = `
			<span data-popup data-popup-target="popupContent2"></span>
			<div id="popupContent2">
				<p>Some popup text</p>
			</div>			
		`;
		document.querySelector('[data-popup]').parentNode.appendChild(div);
		const trigger = document.querySelector('[data-popup-target="popupContent1"]');
		const trigger2 = document.querySelector('[data-popup-target="popupContent2"]');

		// When
		popup();

		// Then
		expect(Popup).toHaveBeenCalledTimes(2);
		expect(Popup).toHaveBeenNthCalledWith(1, trigger, 'popupContent1');
		expect(Popup).toHaveBeenNthCalledWith(2, trigger2, 'popupContent2');
	});
});
