const PopupGroup = require('../js/popup.js')();

// JSDom doesn't support getClientRects so provide a simple default
const clientRects = Element.prototype.getClientRects;

describe('Popup Group', () => {
	let popupGroup;

	function createPopupContent (id, content) {
		const div = document.createElement('div');
		div.setAttribute('id', id);
		div.innerHTML = content;
		return div;
	}

	function createPopup (id, content, options = {}) {
		return popupGroup.spawn(
			document.querySelector('[data-component="popup-link1"]'),
			createPopupContent(id, content),
			options
		);
	}

	beforeEach(function () {
		Element.prototype.getClientRects = function() {
			return [{top: 0, left: 0, height: 0}];
		};

		popupGroup = new PopupGroup();

		document.body.innerHTML = `
			<div class="js-main-column">
			<a href="#" data-component="popup-link1">popup</a>
			</div>
		`
	});

	afterEach(function () {
		Element.prototype.getClientRects = clientRects;
	});

	test('Should expose methods create and close popups in a group', () => {
		expect(popupGroup.spawn).toBeDefined();
		expect(popupGroup.close).toBeDefined();
	});

	test('Should create a popup markup', () => {
		const popup = createPopup('popup-content1', '<p>popup content</p>');

		expect(document.querySelectorAll('.js-focus-catcher').length).toBe(2);
		expect(document.querySelectorAll('.js-close').length).toBe(1);
		expect(document.querySelectorAll('#popup-content1').length).toBe(1);
	});

	test('Should add a u-hide-print class to the content', () => {
		const popup = createPopup('popup-content1', '<p>popup content</p>');
		const content = document.querySelector('#popup-content1');

		expect(content.className).toContain('u-hide-print');
	});

	test('Should be able to toggle the popup display', () => {
		const popup = createPopup('popup-content1', '<p>popup content</p>');
		popup.toggle();

		const content = document.querySelector('#popup-content1');

		expect(content.getAttribute('style')).toContain('display: block');
		popup.toggle();
		expect(content.getAttribute('style')).toContain('display: none');
	});

	test('Should close when the close button is clicked', () => {
		const popup = createPopup('popup-content1', '<p>popup content</p>');
		popup.open();

		const content = document.querySelector('#popup-content1');

		expect(content.getAttribute('style')).toContain('display: block');
		document.querySelector('.js-close').dispatchEvent(new Event('click'));
		expect(content.getAttribute('style')).toContain('display: none');
	});

	test('Should close when something is clicked outside the popup', () => {
		const popup = createPopup('popup-content1', '<p>popup content</p>');
		popup.open();

		const content = document.querySelector('#popup-content1');
		const event = new Event('click')
		Object.defineProperty(event, 'target', {writable: false, value: document.body});

		expect(content.getAttribute('style')).toContain('display: block');
		document.dispatchEvent(event);
		expect(content.getAttribute('style')).toContain('display: none');
	});

	test('Should close when the keyboard focus leaves the popup', () => {
		const popup = createPopup('popup-content1', '<p>popup content</p>');
		popup.open();

		const content = document.querySelector('#popup-content1');

		expect(content.getAttribute('style')).toContain('display: block');
		document.querySelector('.js-focus-catcher').dispatchEvent(new Event('focus'));
		expect(content.getAttribute('style')).toContain('display: none');
	});

	test('Should close when the esc key is pressed', () => {
		const popup = createPopup('popup-content1', '<p>popup content</p>');
		popup.open();

		const content = document.querySelector('#popup-content1');

		expect(content.getAttribute('style')).toContain('display: block');
		document.dispatchEvent(new KeyboardEvent('keyup', {keyCode: 27}));
		expect(content.getAttribute('style')).toContain('display: none');
	});

	test('Should focus the first link in the content', () => {
		const popup = createPopup('popup-content1', '<p><a href="/foo" data-test="focus-target">popup content</a></p>');
		popup.open();
		const content = document.querySelector('#popup-content1');
		expect(document.activeElement).toBe(content.querySelector('a[data-test="focus-target"]'));
	});

	test('Should allow the focus target be overridden', () => {
		const popup = createPopup('popup-content1', '<p data-test="focus-target">popup content</p>', {
			setFocusOn: 'p[data-test="focus-target"]'
		});
		popup.open();
		const content = document.querySelector('#popup-content1');
		expect(document.activeElement).toBe(content.querySelector('p[data-test="focus-target"]'));
	});

	test('Should return focus to the trigger element on close', () => {
		const popup = createPopup('popup-content1', '<p>popup content</p>');
		popup.open();
		document.querySelector('.js-close').dispatchEvent(new Event('click'));
		expect(document.activeElement).toBe(document.querySelector('[data-component="popup-link1"]'));
	});

	test('Should close one popup when another opens', () => {
		const popup1 = createPopup('popup-content1', '<p>popup content</p>');
		const popup2 = createPopup('popup-content2', '<p>popup content</p>');
		popup1.open();

		const content1 = document.querySelector('#popup-content1');
		const content2 = document.querySelector('#popup-content2');

		expect(content1.getAttribute('style')).toContain('display: block');
		expect(content2.getAttribute('style')).toBe(null);

		popup2.open();
		expect(content1.getAttribute('style')).toContain('display: none');
		expect(content2.getAttribute('style')).toContain('display: block');

		popupGroup.close();
		expect(content1.getAttribute('style')).toContain('display: none');
		expect(content2.getAttribute('style')).toContain('display: none');
	});

	test('Should stop event propagation on toggle', () => {
		const event = new Event('click');
		const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');

		const popup = createPopup('popup-content1', '<p>popup content</p>');
		popup.toggle(event);
		expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
		stopPropagationSpy.mockRestore();
	});
});
