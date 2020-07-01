import {makeArray} from '../../global-javascript/src/helpers';
import {Popup} from './popup';

/**
 * Data Attribute API
 */

const popup = () => {
	const triggers = makeArray(document.querySelectorAll('[data-popup]'));
	if (triggers.length === 0) {
		return;
	}
	triggers.forEach(trigger => {
		if (!trigger.hasAttribute('data-popup-target')) {
			return;
		}
		const targetElementSelector = trigger.getAttribute('data-popup-target');
		if (!targetElementSelector) {
			return;
		}
		/* eslint-disable no-new */
		new Popup(trigger, targetElementSelector);
		/* eslint-enable no-new */
	});
};

export {popup};
