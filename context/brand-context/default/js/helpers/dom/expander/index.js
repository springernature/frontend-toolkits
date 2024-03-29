import {makeArray} from '../../util/make-array';
import {getDataOptions} from '../../dom/get-data-options';
import {Expander} from './_expander';

const DATA_COMPONENT = 'data-expander';

const attributes = {
	TARGET_HIDE_CLASS: DATA_COMPONENT + '-hide-class',
	TRIGGER_OPEN_CLASS: DATA_COMPONENT + '-trigger-open-class',
	TRIGGER_OPEN_LABEL: DATA_COMPONENT + '-trigger-open-label',
	CLOSE_ON_FOCUS_OUT: DATA_COMPONENT + '-close-on-focus-out',
	AUTOFOCUS: DATA_COMPONENT + '-autofocus',
	OPEN_EVENT: DATA_COMPONENT + '-open-event',
	DEFAULT_OPEN: DATA_COMPONENT + '-default-open'
};

/**
 * Data Attribute API
 */

const expander = (options = {}) => {
	const triggers = document.querySelectorAll(`[${DATA_COMPONENT}]`);

	if (triggers.length === 0) {
		return;
	}

	makeArray(triggers).forEach(trigger => {
		const dataTarget = DATA_COMPONENT + '-target';

		if (!trigger.hasAttribute(dataTarget)) {
			return;
		}

		const targetElement = document.querySelector(trigger.getAttribute(dataTarget));
		if (!targetElement) {
			return;
		}

		const dataOptions = getDataOptions(trigger, attributes);
		const expander = new Expander(trigger, targetElement, Object.assign({}, options, dataOptions));
		expander.init();
	});
};

export {expander};
