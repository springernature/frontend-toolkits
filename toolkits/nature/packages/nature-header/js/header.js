import {makeArray} from '@springernature/global-javascript/src/helpers';
import {Expander} from '@springernature/global-expander/js/expander';

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
	const triggers = document.querySelectorAll(selectors.DATA_COMPONENT);
	const header = document.querySelector(selectors.HEADER);
	const triggerAttributes = [
		{name: 'role', value: 'button'}
	];

	if (triggers.length === 0 || !header) {
		return;
	}

	makeArray(triggers).forEach(trigger => {
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
