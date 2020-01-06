const AnimateIcon =  require('../js/animate-icon');
const $ = require('jquery');

describe('AnimateIcon', () => {
	let $link = null;

	beforeAll(() => {
		window.$ = $;
		window.Component = {};
	});

	beforeEach(() => {
		document.body.innerHTML = `<span class="js-icon"><span class="icon-rotate"></span></span>`;
		$link = $('.js-icon');
	});

	afterEach(() => {
		document.body.innerHTML = '';
		$link = null;
	});

	test('Should setup a new default animate icon', () => {
		new AnimateIcon();
		
		$link.animateIcon();

		expect($link.data().iconSettings).toEqual({
			activeMediaQuery: null,
			bindToClick: true,
			fallbackIconRotatedClass: 'icon-arrow-up-12x7-gray',
			fallbackIconStartClass: 'icon-arrow-down-12x7-gray',
			iconLocatorSelector: '.icon-rotate',
			iconToggleClass: 'js-icon-toggle'
		});
	});

	test('Should toggle classes on an existing icon when clicking', () => {
		new AnimateIcon();
		$link.animateIcon();
		$link.click();
		expect(document.querySelector('.icon-rotate').classList).toContain('js-icon-toggle');
		$link.click();
		expect(document.querySelector('.icon-rotate').classList).not.toContain('js-icon-toggle');
	});

	test('Should return to starting state when no longer active on the resize event', () => {
		const icon = document.querySelector('.icon-rotate');

		icon.classList.add('js-icon-toggle');

		window.Component.Scheduler = {
			on: jest.fn()
		};
		const deviceState = window.$.deviceState = jest.fn().mockReturnValue(false);

		new AnimateIcon();

		$link.animateIcon({activeMediaQuery: {lt: 875}});
		const onResize = window.Component.Scheduler.on.mock.calls[0][1];

		onResize();
		
		expect(icon.classList).not.toContain('js-icon-toggle');

		jest.restoreAllMocks();
		deviceState.mockReset();
	});

	test('Should mantain the state when it is active on the resize event', () => {
		const icon = document.querySelector('.icon-rotate');

		icon.classList.add('js-icon-toggle');

		window.Component.Scheduler = {
			on: jest.fn()
		};

		const deviceState = window.$.deviceState = jest.fn().mockReturnValue(true);

		new AnimateIcon();

		$link.animateIcon({activeMediaQuery: {gt: 875}});
		const onResize = window.Component.Scheduler.on.mock.calls[0][1];

		onResize();
		
		expect(icon.classList).toContain('js-icon-toggle');

		jest.restoreAllMocks();
		deviceState.mockReset();
	});

	test('Should reset rotation of the icon', () => {
		const icon = document.querySelector('.icon-rotate');

		new AnimateIcon();
		$link.animateIcon({ reset: true });
		$link.click();
		
		expect(icon.classList).not.toContain('js-icon-toggle');

	});

	test('Should set the icon to open after it would have been first initiated', () => {
		const icon = document.querySelector('.icon-rotate');
		new AnimateIcon();
		$link.animateIcon();
		$link.animateIcon('animate');

		expect(icon.classList).toContain('js-icon-toggle');
	});

});