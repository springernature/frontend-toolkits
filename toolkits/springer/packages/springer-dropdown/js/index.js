import {makeArray, getDataOptions} from '@springernature/global-context/js/helpers';
import {constants} from './constants';
import {Dropdown} from './dropdown';

/**
 * Data Attribute API
 */
const attributes = {
	DROPDOWN_CLASSES: constants.DATA_COMPONENT + '-dropdown-class',
	HIDE_CLASS: constants.DATA_COMPONENT + '-hide-class',
	HIDE_INITIALLY: constants.DATA_COMPONENT + '-hide-initially',
	CLICK_OUTSIDE: constants.DATA_COMPONENT + '-click-outside'
};

const dropdown = (options = {}) => {
	const buttons = document.querySelectorAll(`[${constants.DATA_COMPONENT}]`);
	if (buttons.length === 0) {
		return;
	}

	makeArray(buttons).forEach(button => {
		const dataOptions = getDataOptions(button, attributes);
		if (dataOptions.DROPDOWN_CLASSES) {
			dataOptions.DROPDOWN_CLASSES = dataOptions.DROPDOWN_CLASSES.split(' ') || [dataOptions.DROPDOWN_CLASSES];
		}
		const dropdown = new Dropdown(button, Object.assign({}, options, dataOptions));
		dropdown.init();
	});
};

export {dropdown};
