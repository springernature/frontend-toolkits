import {sortBy} from '../js/sort-by';

describe('sortBy', () => {
	const element = {};

	beforeEach(() => {
		document.body.innerHTML = `
			<div>
				<a href="#sort-by" data-sort-by-trigger="">
					<span>Sort by trigger</span>
				</a>
			</div>

			<div id="sort-by" data-sort-by-target="" class="c-sort-by__menu">
				<ul class="c-sort-by__list">
						<li class="c-sort-by__list-item" data-sort-by-radio="">
							<input name="order" id="orderrelevance" value="relevance" type="radio">
							<label for="order-relevance">
								<span>Relevance</span>
							</label>
						</li>
						<li class="c-sort-by__list-item" data-sort-by-radio="">
							<input name="order" id="orderdate_desc" value="date_desc" type="radio">
							<label for="order-date_desc">
								<span>Date — most recent</span>
							</label>
						</li>
						<li class="c-sort-by__list-item" data-sort-by-radio="">
							<input name="order" id="orderdate_asc" value="date_asc" type="radio" checked="checked">
							<label for="order-date_asc">
								<span>Date — oldest first</span>
							</label>
						</li>
				</ul>
    		</div>
		`;

		element.target1 = document.querySelector('#sort-by');

		element.button1 = document.querySelector('[data-sort-by-trigger]');
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

	test('should append target after trigger', () => {
		// Given
		sortBy();
		// When
		element.targetAfterButton1 = element.button1.nextSibling
		// Then
		expect(element.targetAfterButton1).toBe(element.target1);
	});
});
