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

const enhancedHeader = () => {
	const triggers = document.querySelectorAll(selectors.DATA_COMPONENT);
	const header = document.querySelector(selectors.HEADER);
	const triggerAttributes = [
		{attribute: 'role', value: 'button'}
	];

	if (triggers.length === 0 || !header) {
		return;
	}

	makeArray(triggers).forEach(trigger => {
		const targetId = trigger.hasAttribute('href') && trigger.getAttribute('href');
		const targetElement = document.querySelector(targetId);

		if (!targetElement) {
			return;
		}

		for (let {attribute, value} of triggerAttributes) {
			trigger.setAttribute(attribute, value);
		}

		trigger.insertAdjacentElement('afterend', targetElement);
		targetElement.classList.add(classNames.TETHERED);

		const expander = new Expander(trigger, targetElement);

		expander.init();

		return expander;
	});
};

export {enhancedHeader};
