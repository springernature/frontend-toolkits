import {getDataOptions} from '../../../src/helpers';

describe('getDataOptions', () => {
	const DataOptions = {
		OPTION_1: 'data-mycomponent-option1',
		OPTION_2: 'data-mycomponent-option2',
		OPTION_3: 'data-mycomponent-option3',
		OPTION_4: 'data-mycomponent-option4',
		OPTION_5: 'data-mycomponent-option5'
	};

	const element = {};

	beforeEach(() => {
		document.body.innerHTML = `
			<div data-mycomponent-option1="foo" data-mycomponent-option2="bar" data-mycomponent-option3="baz" data-mycomponent-option4="true" data-mycomponent-option5="false" data-notmycomponent="test">My Component</div>
		`;

		element.COMPONENT = document.querySelector('div');
	});

	test('Should return an Object with the values for each key as the values of the data-attributes', () => {
		const options = getDataOptions(element.COMPONENT, DataOptions);

		expect(options).toMatchObject({OPTION_1: 'foo', OPTION_2: 'bar', OPTION_3: 'baz', OPTION_4: true, OPTION_5: false});
	});
});
