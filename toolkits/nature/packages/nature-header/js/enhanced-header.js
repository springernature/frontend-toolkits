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
		{name: 'role', value: 'button'}
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

export {enhancedHeader};
