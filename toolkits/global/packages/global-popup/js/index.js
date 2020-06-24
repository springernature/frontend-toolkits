import {makeArray} from '@springernature/global-javascript/src/helpers';
import {Popup} from '@springernature/global-popup/js/popup';

/**
 * Data Attribute API
 */

export const popup = () => {
	const triggers = makeArray(document.querySelectorAll('[data-popup]'));
	if (triggers.length === 0) return;
	triggers.forEach(trigger => {
		if (!trigger.hasAttribute('data-popup-target')) return;
		const targetElement = document.querySelector(trigger.getAttribute('data-popup-target'));
		if (!targetElement) return;
		new Popup(trigger, targetElement);
	});
};
