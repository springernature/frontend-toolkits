const {segmentedControls} = require('../segmented-controls');

const fixture = `
<div data-segmented-controls class="c-segmented-controls">
	<fieldset>
		<legend class="c-segmented-controls__legend">
			<span>Display</span>
		</legend>
		<div class="c-segmented-controls__radio">
			<input type="radio" name="displayDataAs" value="graph" id="display-data-as-graph" checked="">
			<label for="display-data-as-graph">Graph</label>
		</div>
		<div class="c-segmented-controls__radio">
			<input type="radio" name="displayDataAs" value="table" id="display-data-as-table">
			<label for="display-data-as-table">Table</label>
		</div>
	</fieldset>
</div>
`;

const fixture2 = fixture.replace(' checked=""', '');

describe('Segmented controls component', () => {
	let segmentedControlsContainer;
	let myCallback;
	beforeEach(() => {
		myCallback = jest.fn();
		document.body.innerHTML = fixture;
		segmentedControlsContainer = document.querySelector('[data-segmented-controls]');
	});

	it('does not error if can\'t match data-segmented-controls', () => {
		expect(() => {
			segmentedControls().init();
		}).not.toThrow();
	});

	it('does not error if onCheckedRadioChange isn\'t given', () => {
		expect(() => {
			segmentedControls(segmentedControlsContainer).init();
		}).not.toThrow();
	});

	it('expects onCheckedRadioChange to be a function', () => {
		expect(() => {
			segmentedControls(segmentedControlsContainer, 'notAFunction').init();
		}).toThrow();
	});

	it('expects onCheckedRadioChange not to be called, when clicking already checked option', () => {
		segmentedControls(segmentedControlsContainer, myCallback).init();
		const label = segmentedControlsContainer.querySelector('input[checked] + label');
		label.click();
		expect(myCallback).not.toHaveBeenCalled();
	});

	it('expects onCheckedRadioChange to have been called when clicked an unchecked option', () => {
		segmentedControls(segmentedControlsContainer, myCallback).init();
		const label = segmentedControlsContainer.querySelector('input:not(:checked) + label');
		label.click();
		expect(myCallback).toHaveBeenCalled();
	});

	it('expects onCheckedRadioChange to have called with checked option\'s value when clicked an unchecked option', () => {
		segmentedControls(segmentedControlsContainer, myCallback).init();
		const label = segmentedControlsContainer.querySelector('input:not(:checked) + label');
		label.click();
		expect(myCallback).toHaveBeenCalledWith('table');
	});

	it('expects onCheckedRadioChange to have been called when clicked an unchecked option and when none is checked', () => {
		// Removes the checked
		document.body.innerHTML = fixture2;

		segmentedControlsContainer = document.querySelector('[data-segmented-controls]');
		segmentedControls(segmentedControlsContainer, myCallback).init();
		const label = segmentedControlsContainer.querySelector('input[value="graph"]');
		label.click();
		expect(myCallback).toHaveBeenCalledWith('graph');
	});
});
