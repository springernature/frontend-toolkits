import {getDataOptions} from '../../../js/helpers';

describe('getDataOptions', () => {
	const DataOptions = {
		OPTION_1: 'data-mycomponent-option1',
		OPTION_2: 'data-mycomponent-option2',
		OPTION_3: 'data-mycomponent-option3'
	};

	beforeEach(() => {
		document.body.innerHTML = `
			<div data-mycomponent-option1="foo" data-mycomponent-option2="bar" data-mycomponent-option3="baz" data-notmycomponent="test">My Component</div>
		`;
	});

	test('Should return an Object with the values for each key as the values of the data-attributes', () => {
		const component = document.querySelector('div');
		const options = getDataOptions(component, DataOptions);

		expect(options).toMatchObject({OPTION_1: 'foo', OPTION_2: 'bar', OPTION_3: 'baz'});
	});
});
