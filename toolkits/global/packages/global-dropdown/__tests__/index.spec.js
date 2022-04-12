import {Expander} from '@springernature/brand-context';
import {dropdown} from '../js';

jest.mock('@springernature/brand-context');

describe('Dropdown init', () => {
	beforeEach(() => {
		Expander.mockClear();

		document.body.innerHTML = `
			<div class="c-dropdown">
				<span class="c-dropdown__label">dropdown</span>
				<button aria-expanded="false" class="c-dropdown__button" data-dropdown data-dropdown-target="#dropdown">
					<span>Dropdown</span>
					<svg class="c-dropdown__icon" role="img" aria-hidden="true" focusable="false" height="10" width="10">
						<use xlink:href="#i-chevron-more"></use>
					</svg>
				</button>
				<ul class="c-dropdown__menu" id="dropdown">
					<li><a data-dropdown-item href="#" class="c-dropdown__link">Option 1</a></li>
					<li><a data-dropdown-item href="#" class="c-dropdown__link">Option 2</a></li>
					<li><a data-dropdown-item href="#" class="c-dropdown__link">Option 3</a></li>
				</ul>
			</div>
		`;
	});

	test('Should initiate a new expander component', () => {
		const trigger = document.querySelector('[data-dropdown]');
		const targetElement = document.querySelector('#dropdown');
		// When
		dropdown();

		// Then
		expect(Expander).toHaveBeenCalledWith(trigger, targetElement);
	});
});
