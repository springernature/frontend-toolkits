import {enhancedHeader} from '../js/enhanced-header';

describe('enhancedHeader', () => {
	const element = {};

	beforeEach(() => {
		document.body.innerHTML = `
			<header data-header>
				<a href="#header-expander-1" data-header-expander>
					<span>Header expander 1</span>
				</a>
				<a href="#header-expander-2" data-header-expander>
					<span>Header expander 2</span>
				</a>
			</header>

			<div id="header-expander-1">
				Header expander 1
			</div>

			<div id="header-expander-2">
				Header expander 2
			</div>
		`;

		element.target1 = document.querySelector('#header-expander-1');
		element.target2 = document.querySelector('#header-expander-2');

		element.button1 = document.querySelector('a[href^="#header-expander-1"]');
		element.button2 = document.querySelector('a[href^="#header-expander-2"]');
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});


	test('should make all targets hidden', () => {
		// Given
		enhancedHeader();
		// Then
		expect(element.target1.classList.contains('u-js-hide')).toBe(true);
		expect(element.target2.classList.contains('u-js-hide')).toBe(true);

	});

	test('should set role and aria attributes for buttons', () => {
		// Given
		enhancedHeader();
		// Then
		expect(element.button1.getAttribute('role')).toBe('button');
		expect(element.button1.getAttribute('aria-expanded')).toBe('false');
		expect(element.button1.getAttribute('aria-pressed')).toBe('false');
		expect(element.button2.getAttribute('role')).toBe('button');
		expect(element.button2.getAttribute('aria-expanded')).toBe('false');
		expect(element.button2.getAttribute('aria-pressed')).toBe('false');
	});

	test('should append target after respective triggers', () => {
		// Given
		enhancedHeader();
		// When
		element.targetAfterButton1 = element.button1.nextSibling
		element.targetAfterButton2 = element.button2.nextSibling
		// Then
		expect(element.targetAfterButton1).toBe(element.target1);
		expect(element.targetAfterButton2).toBe(element.target2);
	});
});
