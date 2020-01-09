const Boxes = require('../js/expandable-boxes');

describe('Expandable Boxes', () => {
	const containerID = 'box-Sec4';
	let boxes = null;
	let boxesContainer = null;

	function initBoxes() {
		boxes = new Boxes();
		boxes.init(boxesContainer);
	}

	beforeEach(() => {
		document.body.innerHTML =  `
			<div class="c-article-box c-article-box--expanded" data-expandable-box-container="true">
				<div class="c-article-box__container" data-expandable-box="true" aria-hidden="false" id="${containerID}">
					<h3 class="c-article-box__container-title js-expandable-title" id="Sec4"> Box 1 | Models for light–matter coupling</h3>
					<div class="c-article-box__content">Content</div>
				</div>
			</div>
		`;
		boxesContainer = document.querySelectorAll('div[data-expandable-box-container]');
	});

	afterEach(() => {
		boxes = null;
		document.body.innerHTML = '';
		boxesContainer = null;
	});

	test('Should be able to initiate an expandable box', () => {
		initBoxes();
		expect(boxes.init).toBeDefined();
	});

	test('Should contain box controls', () => {
		initBoxes();
		
		const firstBoxContainer = boxesContainer[0];
		const button = firstBoxContainer.querySelector('button');

		expect(firstBoxContainer.querySelector('.c-article-box__controls')).toBeDefined();
		expect(button).toBeDefined();
		expect(button.getAttribute('aria-controls')).toBe(containerID);
		expect(button.querySelector('.c-article-box__button-text')).toBeDefined();
		expect(firstBoxContainer.querySelector('.c-article-box__fade')).toBeDefined();

	});

	test('Should contain a default title button', () => {
		initBoxes();
		const firstBoxContainer = boxesContainer[0];
		const button = firstBoxContainer.querySelector('button');

		expect(button.innerHTML).toContain('this box');
	});

	test('Should contain a button title that matches with an existing figcaption', () => {
		const figcaptionTitle = 'Table 1';
		const figure = `<figure><figcaption class="c-article-table__figcaption"><b id="Tab1" data-test="table-caption">${figcaptionTitle}</b></figcaption></figure>`;

		document.querySelector('.c-article-box__content').innerHTML = figure;

		initBoxes();

		const firstBoxContainer = boxesContainer[0];
		const button = firstBoxContainer.querySelector('button');

		expect(button.innerHTML).toContain(figcaptionTitle)
	});

	test('Should be closed by default', () => {
		initBoxes();

		const firstBoxContainer = boxesContainer[0];
		const button = firstBoxContainer.querySelector('button');
		const expandable = firstBoxContainer.querySelector('[data-expandable-box]');

		expect(button.innerHTML).toContain('Show more');
		expect(expandable.parentNode.classList).not.toContain('c-article-box--expanded');
		expect(expandable.getAttribute('style')).toContain('height: 95px');
		expect(expandable.getAttribute('aria-hidden')).toBe('true');
		expect(firstBoxContainer.querySelector('button').getAttribute('aria-expanded')).toBe('false');
		expect(firstBoxContainer.isOpen).toBeFalsy();
	});

	test('Should toggle between open and close when click on the button', () => {
		initBoxes();
		const firstBoxContainer = boxesContainer[0];
		const button = firstBoxContainer.querySelector('button');
		const expandable = firstBoxContainer.querySelector('[data-expandable-box]');

		expandable.scrollIntoView = jest.fn();

		button.click();
		expect(button.innerHTML).toContain('Show less');
		expect(expandable.parentNode.classList).toContain('c-article-box--expanded');
		expect(expandable.getAttribute('style')).toContain('height: auto');
		expect(expandable.getAttribute('aria-hidden')).toBe('false');
		expect(firstBoxContainer.querySelector('button').getAttribute('aria-expanded')).toBe('true');
		expect(firstBoxContainer.isOpen).toBeTruthy();

		button.click();
		expect(firstBoxContainer.isOpen).toBeFalsy();
		expect(expandable.getAttribute('aria-hidden')).toBe('true');
		
	});

	test.skip('Should scroll into the visible area of the browser window when required', () => {

	});


;


	
});