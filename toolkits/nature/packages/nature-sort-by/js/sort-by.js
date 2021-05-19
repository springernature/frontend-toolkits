import {Expander} from '@springernature/global-expander/js/expander';

const sortBy = () => {
	const trigger = document.querySelector('[data-sort-by-trigger]');
	const targetElement = document.querySelector('[data-sort-by-target]');

	if (!trigger || !targetElement) {
		return;
	}

	const triggerAttributes = [
		{name: 'role', value: 'button'}
	];

	triggerAttributes.forEach(function (attribute) {
		trigger.setAttribute(attribute.name, attribute.value);
	});

	trigger.insertAdjacentElement('afterend', targetElement);
	targetElement.classList.add('has-tethered');

	const expander = new Expander(trigger, targetElement, {AUTOFOCUS: 'firstTabbable'});

	expander.init();

	return expander;
};

export {sortBy};
