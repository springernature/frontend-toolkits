const DeviceState = require('../js/device-state');
const $ = require('jquery');

describe('DeviceState', () =>{
	const getComputedStyle = window.getComputedStyle;

	function mockGetComputedStyle(size = 1200) {
		jest.spyOn(window, 'getComputedStyle').mockImplementation(() => {
			return {
				content: {
					replace: () => `mq${size}`
				}
			};
		});
	}

	beforeAll(() => {
		window.$ = $;
	});

	test('Should be able to return the current media query', () => {
		DeviceState();
		
		expect(window.$.deviceState).toBeDefined();
	});

	test('Should get a default media query in old browsers', () => {
		window.getComputedStyle = null;
		DeviceState();
		expect($.deviceState()).toBe('full');
		window.getComputedStyle = getComputedStyle; // restore window.getComputedStyle
	});

	test('Should get the current media query set in the body before content pseudoelement', () => {
		mockGetComputedStyle();

		DeviceState();
		expect($.deviceState()).toBe('mq1200');
	});

	test('Should return true when full size of 1201 is greater than a given size in old browsers', () => {
		window.getComputedStyle = null;
		DeviceState();
		expect($.deviceState({lt: 1202})).toBeTruthy();

		window.getComputedStyle = getComputedStyle; // restore window.getComputedStyle
	});

	test('Should return true when a given size is less than 875', () => {
		mockGetComputedStyle(300);

		DeviceState();
		expect($.deviceState({lt: 875})).toBeTruthy();
	});

	test('Should return true when a given size is greater than 875', () => {
		mockGetComputedStyle(1000);

		DeviceState();
		expect($.deviceState({gt: 875})).toBeTruthy();
	});

});