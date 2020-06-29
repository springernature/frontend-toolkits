import {makeArray} from '../../global-javascript/src/helpers/';
import {Popup} from './popup';

/**
 * Data Attribute API
 */

export const popup = () => {
	const triggers = makeArray(document.querySelectorAll('[data-popup]'));
	if (triggers.length === 0) return;
	triggers.forEach(trigger => {
		if (!trigger.hasAttribute('data-popup-target')) return;
		const targetElement = trigger.getAttribute('data-popup-target');
		if (!targetElement) return;
		new Popup(trigger, targetElement);
	});
};
