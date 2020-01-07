const ariaButton =  require('../js/aria-button');
const $ = require('jquery');

describe('AriaButton', () => {
	beforeAll(() => {
		window.$ = $;
	});

	let $element = null;
	
	function appendSectionTitle() {
		document.body.innerHTML = `<h2 class="c-article-section__title js-section-title js-c-reading-companion-sections-item" id="author-information">Author information</h2>`;
		$element = $('.js-section-title');
	}

	function appendLink() {
		document.body.innerHTML = '<a href="" class="js-link">link focusable by default</a>';
		$element = $('.js-link');
	}

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('Should be able to give an element a button role', () => {
		appendSectionTitle();
		ariaButton();
		$element.giveButtonRole();

		expect($.fn.giveButtonRole).toBeDefined();
	});

	test('Should give a role button to an element when it is not a button ', () => {				
		appendSectionTitle();
		ariaButton();
		$element.giveButtonRole();

		expect(document.querySelector('.js-section-title').getAttribute('role')).toBe('button');
	});

	test('Should take the focus by default on focusable elements', () => {
		appendLink();
		ariaButton();
		$element.giveButtonRole();

		expect(document.querySelector('.js-link').classList).not.toContain('role-button');
	});

	test('Should be able to render a :focus style when an element is not focusable by default', () => {
		appendSectionTitle();
		ariaButton();
		$element.giveButtonRole();

		expect(document.querySelector('.js-section-title').classList).toContain('role-button');
		expect(document.querySelector('.js-section-title').getAttribute('tabindex')).toBe('0');
	});

	test('Should not take focus when element is hidden', () => {
		appendLink();
		document.querySelector('.js-link').setAttribute('style', 'display:none');
		ariaButton();
		$element.giveButtonRole();

		expect(document.querySelector('.js-link').classList).not.toContain('role-button');
	});

	test('Should remove capability of receiving focus on a given element', () => {
		appendSectionTitle();
		ariaButton();
		$element.giveButtonRole('destroy');

		expect(document.querySelector('.js-section-title').classList).not.toContain('role-button');
		expect(document.querySelector('.js-section-title').getAttribute('role')).toBeDefined();
		expect(document.querySelector('.js-section-title').getAttribute('tabindex')).toBeDefined();
	});

	test.skip('Should receive a keypress event on spacebar or enter key', () => {
		// TODO
	});
});