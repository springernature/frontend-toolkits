import {Expander} from '@springernature/global-expander/js/expander';
import {makeArray} from '@springernature/global-javascript/src/helpers';

const generateParameters = value => {
	const parameters = new URL(document.location).searchParams;
	parameters.set('order', value);
	return parameters;
};

const sortBy = () => {
	const trigger = document.querySelector('[data-sort-by-trigger]');
	const targetElement = document.querySelector('[data-sort-by-target]');
	const radios = makeArray(document.querySelectorAll('[data-sort-by-radio]'));

	if (!trigger || !targetElement || !radios) {
		return;
	}

	radios.forEach(element => {
		element.addEventListener('click', event => {
			const value = element.querySelector('input').value;
			const parameters = generateParameters(value);
			window.location.replace('/search?' + parameters);
		});
	});

	trigger.setAttribute('role', 'button');

	trigger.insertAdjacentElement('afterend', targetElement);
	targetElement.classList.add('has-tethered');

	const expander = new Expander(trigger, targetElement);

	expander.init();

	return expander;
};

export {sortBy};
