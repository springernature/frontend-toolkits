import {Expander} from '../js/expander';
import {expander} from '../js';

jest.mock('../js/expander');

describe('Data Attribute API', () => {
	const elements = {};

	beforeEach(() => {
		Expander.mockClear();

		document.body.innerHTML = `
			<button id="button1"
					data-expander
					data-expander-target="#target1">Expander 1</button>
			<div id="target1">Target 1</div>
			<button id="button2"
					data-expander
					data-expander-target="#target2"
					data-expander-hide-class="data-target-hide-class"
					data-expander-trigger-open-class="data-trigger-open-class"
					data-expander-trigger-open-label="data-trigger-shown-label"
					data-expander-close-on-clickoff="true"
					data-expander-autofocus="false">Expander 2</button>
			<div id="target2">Target 2</div>
		`;

		elements.button1 = document.querySelector('#button1');
		elements.button2 = document.querySelector('#button2');
		elements.target1 = document.querySelector('#target1');
		elements.target2 = document.querySelector('#target2');
	});

	test('Should create a new Expander and call init for each data-expander in the DOM', () => {
		// When
		expander();

		// Then
		expect(Expander).toHaveBeenCalledTimes(2);

		for (const instance of Expander.mock.instances) {
			expect(instance.init).toHaveBeenCalled();
		}
	});

	test('Should use options passed during initialisation', () => {
		// Given
		const initialisationOptions = {
			TARGET_HIDE_CLASS: 'init-target-hide-class',
			TRIGGER_OPEN_CLASS: 'init-trigger-open-class',
			TRIGGER_OPEN_LABEL: 'init-trigger-open-label',
			CLOSE_ON_CLICKOFF: false,
			AUTOFOCUS: true,
			OPEN_EVENT: false
		};

		// When
		expander(initialisationOptions);

		// Then
		expect(Expander).toHaveBeenNthCalledWith(1, elements.button1, elements.target1, initialisationOptions);
	});

	test('Should use options passed via data-* attributes over options passed during initialisation', () => {
		// Given
		const initialisationOptions = {
			TARGET_HIDE_CLASS: 'init-target-hide-class',
			TRIGGER_OPEN_CLASS: 'init-trigger-open-class',
			TRIGGER_OPEN_LABEL: 'init-trigger-open-label',
			CLOSE_ON_CLICKOFF: false,
			AUTOFOCUS: true,
			OPEN_EVENT: false
		};

		// When
		expander(initialisationOptions);

		// Then
		expect(Expander).toHaveBeenNthCalledWith(2, elements.button2, elements.target2, {
			TARGET_HIDE_CLASS: 'data-target-hide-class',
			TRIGGER_OPEN_CLASS: 'data-trigger-open-class',
			TRIGGER_OPEN_LABEL: 'data-trigger-shown-label',
			CLOSE_ON_CLICKOFF: true,
			AUTOFOCUS: false,
			OPEN_EVENT: false
		});
	});
});
