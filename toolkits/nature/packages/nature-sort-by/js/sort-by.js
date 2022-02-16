import {makeArray} from '@springernature/global-javascript/src/helpers';

function addInputListeners(inputs, submitButton) {
	inputs.forEach(input => {
		input.addEventListener('change', () => {
			submitButton.click();
		});
	});
}

function sortBy() {
	const forms = makeArray(document.querySelectorAll('[data-sort-by]'));
	forms.forEach(form => {
		const radioInputs = makeArray(form.querySelectorAll('[data-sort-by-input]'));
		const submitButton = form.querySelector('[data-sort-by-button]');
		addInputListeners(radioInputs, submitButton);
	});
}

export {sortBy};
