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
		expect(Popup).toHaveBeenNthCalledWith(1, trigger, 'popupContent1', {});
		expect(Popup).toHaveBeenNthCalledWith(2, trigger2, 'popupContent2', {});
	});

	it('should use data attr option if present in DOM', () => {
		// Given
		document.body.innerHTML = `
		<div class="test-selector">
			<div>
				<span data-popup data-popup-hook=".test-selector" data-popup-target="popupContent3"></span>
				<div id="popupContent3" class="c-popup">
					<p>Some popup text</p>
				</div>	
			</div>
		</div>
		`;

		// When
		popup();
		const trigger = document.querySelector('[data-popup]');
		trigger.click();

		// Then
		expect(Popup).toHaveBeenCalledTimes(1);
		expect(Popup).toHaveBeenNthCalledWith(1, trigger, 'popupContent3', {HOOK: '.test-selector'});
	});
});
