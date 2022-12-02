import {CustomerSatisfactionInput} from './customer-satisfaction-input';

const init = () => {
	const asides = document.querySelectorAll('aside[data-customer-satisfaction-input]');

	asides.forEach(aside => {
		/* eslint-disable no-new */
		new CustomerSatisfactionInput(aside);
		/* eslint-enable no-new */
	});
};

export {init as customerSatisfactionInput};

