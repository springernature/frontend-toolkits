import {Expander} from '@springernature/brand-context';

const userDetails = () => {
	const trigger = document.querySelector('[data-component-user-details-open]');
	const target = document.querySelector('[data-component-user-details]');
	if (trigger && target) {
		const myExpander = new Expander(trigger, target, {TARGET_HIDE_CLASS: 'js-hide', TRIGGER_OPEN_CLASS: 'open'});
		myExpander.init();
	}
};

export default userDetails;
