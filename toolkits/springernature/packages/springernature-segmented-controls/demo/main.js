import {segmentedControls} from '../js/index';

document.addEventListener('DOMContentLoaded', () => {
	const frequencyInput = document.querySelector('[name="frequency"]');
	const segmentedControlsContainer = frequencyInput.closest('[data-segmented-controls]');

	segmentedControls(segmentedControlsContainer, function segmentedControlsCallback(checkedValue) {
		const label = segmentedControlsContainer.querySelector('[for="frequency-' + checkedValue + '"]');
		alert('You picked: ' + label.textContent.trim());
	}).init();
});
