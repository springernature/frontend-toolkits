import {makeArray, Expander} from '@springernature/brand-context';

/**
 * Constants
 */

const DATA_COMPONENT = 'data-header-expander';

const classNames = {
	TETHERED: 'has-tethered'
};

const selectors = {
	DATA_COMPONENT: `[${DATA_COMPONENT}]`,
	HEADER: '[data-header]'
};

const findTarget = selector => {
	if (selector) {
		return document.querySelector(selector);
	}
	return null;
};

const header = () => {
	const triggerElements = document.querySelectorAll(selectors.DATA_COMPONENT);
	const headerElement = document.querySelector(selectors.HEADER);
	const triggerAttributes = [
		{name: 'role', value: 'button'}
	];

	if (triggerElements.length === 0 || !headerElement) {
		return;
	}

	makeArray(triggerElements).forEach(trigger => {
		const targetElement = findTarget(trigger.hash);

		if (!targetElement) {
			return;
		}

		triggerAttributes.forEach(function (attribute) {
			trigger.setAttribute(attribute.name, attribute.value);
		});

		trigger.insertAdjacentElement('afterend', targetElement);
		targetElement.classList.add(classNames.TETHERED);

		const expander = new Expander(trigger, targetElement, {AUTOFOCUS: 'firstTabbable'});

		expander.init();

		return expander;
	});
};

export {header};
