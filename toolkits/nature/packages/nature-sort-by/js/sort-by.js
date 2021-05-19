import {Expander} from '@springernature/global-expander/js/expander';
import {makeArray} from '@springernature/global-javascript/src/helpers';


const generateParams = (value) => {
	const params = (new URL(document.location)).searchParams;
	params.set('order', value);
	return params;
}

const sortBy = () => {
	const trigger = document.querySelector('[data-sort-by-trigger]');
	const targetElement = document.querySelector('[data-sort-by-target]');
	const radios = makeArray(document.querySelectorAll('[data-sort-by-radio]'));

	if (!trigger || !targetElement || !radios) {
		return;
	}

	radios.forEach((el) => {
		el.addEventListener('click', (event) => {
			event.preventDefault();

			const value = el.querySelector('input').value;
			const params = generateParams(value);
			window.location.replace('/search?' + params);
		})
	});

	trigger.setAttribute('role', 'button');

	trigger.insertAdjacentElement('afterend', targetElement);
	targetElement.classList.add('has-tethered');

	const expander = new Expander(trigger, targetElement);

	expander.init();

	return expander;
};

export {sortBy};
