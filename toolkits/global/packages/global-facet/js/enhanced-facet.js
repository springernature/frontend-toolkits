import {makeArray, Expander} from '@springernature/brand-context';

/**
 * Constants
 */

const DATA_COMPONENT = 'data-facet-expander';

const selectors = {
	DATA_COMPONENT: `[${DATA_COMPONENT}]`,
	FACET: '[data-facet]'
};

const classNames = {
	SELECTED: 'c-facet__selected',
	ELLIPSIS: 'c-facet__ellipsis',
	CLEAR: 'c-facet-expander__clear-selection',
	BUTTON_CONTAINER: 'c-facet-expander__button-container',
	SUBMIT: 'c-facet__submit'
};

const buttonText = {
	ALL: 'All',
	SELECTED: 'selected',
	CLEAR_SELECTION: 'Clear selection',
	SUBMIT: 'Apply filters'
};

const facetTargetAttribute = 'data-facet-target';

const containsCheckableInput = element => {
	return Boolean(element.querySelector('input[type=checkbox], input[type=radio]'));
};

const createClearButton = (element, container) => {
	const button = document.createElement('button');
	button.classList.add(classNames.CLEAR);
	button.textContent += buttonText.CLEAR_SELECTION;

	button.addEventListener('click', event => {
		event.preventDefault();
		const checkedInputs = element.querySelectorAll('input[type=checkbox]:checked, input[type=radio]:checked');

		checkedInputs.forEach(function (checkedInput) {
			checkedInput.checked = false;
		});

		button.closest('form').submit();
	});
	container.appendChild(button);
};

const createSubmitButton = container => {
	const button = document.createElement('button');
	button.classList.add(classNames.SUBMIT);
	button.textContent += buttonText.SUBMIT;
	container.appendChild(button);
};

const addFormControlsInExpander = element => {
	const buttonContainer = document.createElement('div');
	buttonContainer.classList.add(classNames.BUTTON_CONTAINER);
	element.prepend(buttonContainer);
	createSubmitButton(buttonContainer);
	createClearButton(element, buttonContainer);
};

const createFilterbuttonText = (button, dropdown) => {
	const checkedInput = dropdown.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
	const checkedInputLength = checkedInput.length;
	const buttonSpan = document.createElement('span');
	buttonSpan.classList.add(classNames.ELLIPSIS);

	if (checkedInputLength === 1) {
		buttonSpan.textContent += dropdown.querySelector('input:checked + label').textContent.trim();
		button.classList.add(classNames.SELECTED);
	} else if (checkedInputLength > 1) {
		buttonSpan.textContent += `${checkedInputLength} ${buttonText.SELECTED}`;
		buttonSpan.classList.add(classNames.SELECTED);
	} else {
		buttonSpan.textContent += buttonText.ALL;
	}
	button.prepend(buttonSpan);
};

const enhancedFacet = () => {
	const triggers = document.querySelectorAll(selectors.DATA_COMPONENT);
	const facet = document.querySelector(selectors.FACET);

	if (triggers.length === 0 || !facet) {
		return;
	}

	makeArray(triggers).forEach(trigger => {
		const targetId = trigger.hasAttribute(facetTargetAttribute) && trigger.getAttribute(facetTargetAttribute);
		const targetElement = document.querySelector(targetId);

		if (!targetElement) {
			return;
		}

		if (containsCheckableInput(targetElement)) {
			createFilterbuttonText(trigger, targetElement);
			addFormControlsInExpander(targetElement);
		}

		const expander = new Expander(trigger, targetElement);

		expander.init();
	});
};

export {enhancedFacet};
