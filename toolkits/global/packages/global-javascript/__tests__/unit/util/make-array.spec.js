import {makeArray} from '../../../src/helpers';

describe('makeArray', () => {
	test('Should take a node list and return an array', () => {
		// Given
		document.body.innerHTML = `
			<div>Node 1</div>
			<div>Node 2</div>
			<div>Node 3</div>
			<div>Node 4</div>
		`;
		let nodes = document.querySelectorAll('div');
		// When
		nodes = makeArray(nodes);
		// Then
		expect(Array.isArray(nodes)).toBe(true);
	});
});
