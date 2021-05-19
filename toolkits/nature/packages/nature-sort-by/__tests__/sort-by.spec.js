import {sortBy} from '../js/sort-by';

describe('sortBy', () => {
	const element = {};

	beforeEach(() => {
		document.body.innerHTML = `
			<div>
				<a href="#sort-by" data-sort-by>
					<span>Sort by trigger</span>
				</a>
			</div>

			<div id="sort-by">
				Sort by
			</div>
		`;

		element.target1 = document.querySelector('#sort-by');

		element.button1 = document.querySelector('a[href^="#sort-by"]');
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('should set role for button', () => {
		// Given
		sortBy();
		// Then
		expect(element.button1.getAttribute('role')).toBe('button');
	});

	test('should append target after respective triggers', () => {
		// Given
		sortBy();
		// When
		element.targetAfterButton1 = element.button1.nextSibling
		// Then
		expect(element.targetAfterButton1).toBe(element.target1);
	});
});
