import {sortBy} from '../js/sort-by';

describe('Sort By', () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<form action="/" method="post">
				<div class="t-sort-by" data-sort-by="">
					<span class="t-sort-by__heading">Sort by:</span>
					<input class="t-sort-by__input" data-sort-by-input="" name="order" value="relevance" id="sort-by-relevance" type="radio">
					<label class="t-sort-by__label" for="sort-by-relevance">Relevance</label>
					<input class="t-sort-by__input" data-sort-by-input="" name="order" value="desc" id="sort-by-desc" type="radio" checked="">
					<label class="t-sort-by__label" for="sort-by-desc">Most recent</label>
					<input class="t-sort-by__input" data-sort-by-input="" name="order" value="asc" id="sort-by-asc" type="radio">
					<label class="t-sort-by__label" for="sort-by-asc">Oldest first</label>
					<button class="t-sort-by__button" data-sort-by-button="" type="submit">Submit</button>
				</div>
			</form>
		`;
	});

	test('Should submit form if radio input checked', () => {
		const form = document.querySelector('form');
		const spy  = jest.fn();
		form.addEventListener('submit', event => {
			event.preventDefault();
			spy();
		});
		sortBy();
		const input = document.querySelector('input');
		input.dispatchEvent(new Event('change'));
		expect(spy).toHaveBeenCalled();
	});
});
