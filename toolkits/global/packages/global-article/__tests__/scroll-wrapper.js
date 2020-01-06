const ScrollWrapper = require('../js/scroll-wrapper');

describe('Scroll Wrapper', () => {
	let mockElement = null;
	let scrollWrapper = null;
	let bindEventsSpy;
	let schedulerMock = null;

	beforeAll(() => {
		document.body.innerHTML = '<div class="js-fake-container">content</div>';
		mockElement = document.querySelector('.js-fake-container');
	});

	afterAll(() => {
		mockElement = null;
		document.body.innerHTML = '';
	});

	beforeEach(() => {
		schedulerMock = {
			on: jest.fn()
		};
		scrollWrapper = new ScrollWrapper();
		bindEventsSpy = jest.spyOn(scrollWrapper, 'bindEvents');
	});

	afterEach(() => {
		bindEventsSpy.mockRestore();
		scrollWrapper = null;
		schedulerMock = null;
	});

	test('Should be able to initiate a scroll wrapper', () => {
		expect(scrollWrapper.init).toBeDefined();
		expect(scrollWrapper.bindEvents).toBeDefined();
	});

	test('Should not do anything if no element need a scroll wrapper', () => {
		scrollWrapper.init();
		expect(scrollWrapper.bindEvents).not.toHaveBeenCalled();
	});

	test('Should register event listeners for each element', () => {
		scrollWrapper.init([mockElement], () => {}, schedulerMock);
		expect(scrollWrapper.bindEvents).toHaveBeenCalledTimes(1);
	});

	test('Should define an event listener for load and resize events', () => {
		scrollWrapper.init([mockElement], () => {}, schedulerMock);
		expect(schedulerMock.on).toHaveBeenCalled();
	});

	test('Should execute a callback function on scroll event', () => {
		const callback = jest.fn();
		scrollWrapper.init([mockElement], callback, schedulerMock);

		window.dispatchEvent(new CustomEvent('scroll'));

		expect(callback).toBeCalledWith(expect.any(Function), 100);
	});
});