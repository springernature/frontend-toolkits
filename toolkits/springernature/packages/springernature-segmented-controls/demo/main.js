import {segmentedControls} from '../js/segmented-controls';

document.addEventListener('DOMContentLoaded', () => {
	const frequencyInput = document.querySelector('[name="frequency"]');
	const segmentedControlsContainer = frequencyInput.closest('[data-segmented-controls]');

	function segmentedControlsCallback(checkedValue) {
		const label = segmentedControlsContainer.querySelector('[for="frequency-' + checkedValue + '"]');
		// eslint-disable-next-line no-alert
		alert('You picked: ' + label.textContent.trim());
	}

	segmentedControls(segmentedControlsContainer, segmentedControlsCallback).init();
});
