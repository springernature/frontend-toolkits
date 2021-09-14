import {makeArray, getDataOptions} from '../../global-javascript/src/helpers';
import {Popup} from './popup';

const DATA_COMPONENT = 'data-popup';

const optionSelectors = {
	MIN_WIDTH: DATA_COMPONENT + '-min-width',
	MAX_WIDTH: DATA_COMPONENT + '-max-width',
	HOOK: DATA_COMPONENT + '-hook'
};

/**
 * Data Attribute API
 */

const popup = () => {
	const triggers = makeArray(document.querySelectorAll('[data-popup]'));
	if (triggers.length === 0) {
		return;
	}
	for (const trigger in triggers) {
		if (Object.prototype.hasOwnProperty.call(triggers, trigger)) {
			if (!trigger.hasAttribute('data-popup-target')) {
				return;
			}
			const targetElementSelector = trigger.getAttribute('data-popup-target');
			if (!targetElementSelector && !document.querySelector(targetElementSelector)) {
				return;
			}

			const dataOptions = getDataOptions(trigger, optionSelectors);
			/* eslint-disable no-new */
			new Popup(trigger, targetElementSelector, Object.assign({}, dataOptions));
			/* eslint-enable no-new */
		}
	}
};

export {popup};
