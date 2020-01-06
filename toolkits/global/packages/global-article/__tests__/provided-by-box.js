const ProvidedByBox = require('../js/provided-by-box');

describe('ProvidedByBox', () => {
	beforeEach(() => {
		document.body.innerHTML = '<div class="u-display-none" aria-hidden="true" data-component="provided-by-box"><p>Access provided by <span class="js-institution-name"></span></p></div>';
	});

	test('Should render an institutional name element if it is provided', () => {
		const institutionName = 'Nature Masterclasses Offices';
		const $parentElement = document.querySelector('[data-component="provided-by-box"]');
		const providedBox = ProvidedByBox();
		providedBox.init({ institutionName: institutionName, displayInstitutionName: true});

		expect(document.querySelector(`.js-institution-name`).innerHTML).toBe(institutionName);
		expect($parentElement.classList).not.toContain('u-display-none');
		expect($parentElement.getAttribute('aria-hidden')).toBeNull();
	});
});