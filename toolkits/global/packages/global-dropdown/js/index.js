import {Expander} from '../../global-expander/js/expander';

const DATA_COMPONENT = 'data-dropdown';

const attributes = {
	targetSelector: `${DATA_COMPONENT}-target`
};

const dropdown = () => {
	const trigger = document.querySelector(`[${DATA_COMPONENT}]`);
	if (!trigger) {
		return;
	}

	const target = trigger.getAttribute(attributes.targetSelector);
	if (!target) {
		return;
	}

	const targetElement = document.querySelector(target);
	if (!targetElement) {
		return;
	}

	const expander = new Expander(trigger, targetElement);

	expander.init();
};

export {dropdown};
