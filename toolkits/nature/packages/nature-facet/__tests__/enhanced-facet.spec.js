import {enhancedFacet} from '../js/enhanced-facet';

describe('enhancedFacet', () => {
	const fragments = {
		triggerMultipleButton: `
			<div data-facet>
				<button data-facet-expander data-facet-target="#Article-Type-target-1">Article Type 1</button>
				<div id="Article-Type-target-1">Some text 1</div>
				<button data-facet-expander data-facet-target="#Article-Type-target-2">Article Type 2</button>
				<div id="Article-Type-target-2">Some text 2</div>
			</div>
		`,
		targetCheckboxInputs: `
			<form onsubmit="return false;">
				<div data-facet>
					<button data-facet-expander data-facet-target="#Article-Type-target"></button>
					<div id="Article-Type-target">
						<ul>
							<li>
								<input name="article_type" id="article-type-1" value="1" type="checkbox"/>
								<label for="article-type-1">
									<span>item 1</span>
								</label>
							</li>
							<li>
								<input name="article_type" id="article-type-2" value="2" type="checkbox"/>
								<label for="article-type-2">
									<span>item 2</span>
								</label>
							</li>
						</ul>
					</div>
				</div>
			</form>
		`,
		targetRadioInputs: `
			<form onsubmit="return false;">
				<div data-facet>
					<button data-facet-expander data-facet-target="#Article-Type-target"></button>
					<div id="Article-Type-target">
						<ul>
							<li>
								<input name="article_type" id="article-type-1" value="1" type="radio"/>
								<label for="article-type-1">
									<span>item 1</span>
								</label>
							</li>
							<li>
								<input name="article_type" id="article-type-2" value="2" type="radio"/>
								<label for="article-type-2">
									<span>item 2</span>
								</label>
							</li>
						</ul>
					</div>
				</div>
			</form>
		`,
		targetLinks: `
			<div data-facet>
				<button data-facet-expander data-facet-target="#Article-Type-target">Button</button>
				<div id="Article-Type-target">
					<ul>
						<li>
							<a href="#">
								<span>item (1)</span>
							</a>
						</li>
						<li>
							<a href="#">
								<span>item (2)</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		`
	}

	beforeEach(() => {
		document.body.innerHTML = ``;
	});

	test('should bind actions to multiple buttons', () => {
		document.body.innerHTML = fragments.triggerMultipleButton;
		// Given
		enhancedFacet();
		// Then
		const triggers = document.querySelectorAll('[data-facet-expander]');
		triggers.forEach(trigger => {
			trigger.click();
			expect(trigger.getAttribute('aria-expanded')).toBe('true');
		});
	});

	test('should set button text to "All" when no checkable input selected', () => {
		document.body.innerHTML = fragments.targetCheckboxInputs;
		// Given
		enhancedFacet();
		// Then
		const trigger = document.querySelector('[data-facet-expander]');
		expect(trigger.textContent.trim()).toBe('All');
	});

	test('should set button name to label of single checked checkbox input', () => {
		document.body.innerHTML = fragments.targetCheckboxInputs;
		document.querySelector('#article-type-2').setAttribute('checked', 'checked');
		// Given
		enhancedFacet();
		// Then
		const trigger = document.querySelector('[data-facet-expander]');
		expect(trigger.textContent.trim()).toBe('item 2');
	});

	test('should set button name to label of single checked radio input', () => {
		document.body.innerHTML = fragments.targetRadioInputs;
		document.querySelector('#article-type-2').setAttribute('checked', 'checked');
		// Given
		enhancedFacet();
		// Then
		const trigger = document.querySelector('[data-facet-expander]');
		expect(trigger.textContent.trim()).toBe('item 2');
	});

	test('should set button to display number of selected checkbox items when more than one selected', () => {
		document.body.innerHTML = fragments.targetCheckboxInputs;
		document.querySelector('#article-type-1').setAttribute('checked', 'checked');
		document.querySelector('#article-type-2').setAttribute('checked', 'checked');
		// Given
		enhancedFacet();
		// Then
		const trigger = document.querySelector('[data-facet-expander]');
		expect(trigger.textContent.trim()).toBe('2 selected');
	});

	test('should clear checkboxes when clear button is clicked', () => {
		document.body.innerHTML = fragments.targetCheckboxInputs;
		document.querySelector('#article-type-1').setAttribute('checked', 'checked');
		document.querySelector('#article-type-2').setAttribute('checked', 'checked');
		// Given
		enhancedFacet();
		// Then
		const clearButton = document.querySelector('button.c-facet__clear-selection');
		const checkboxes = document.querySelectorAll('#Article-Type-target input[type="checkbox"]');
		clearButton.click();
		checkboxes.forEach(checkbox => {
			expect(checkbox.checked).toEqual(false);
		});
	});

	test('should not update trigger text when target does not contain checkbox or radio inputs', () => {
		document.body.innerHTML = fragments.targetLinks;
		// Given
		enhancedFacet();
		// Then
		const trigger = document.querySelector('[data-facet-expander]');
		expect(trigger.textContent.trim()).toBe('Button');
	});
});
