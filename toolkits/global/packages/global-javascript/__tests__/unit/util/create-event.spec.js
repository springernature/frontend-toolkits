import {createEvent} from '../../../src/helpers';

describe('createEvent: customEvent supported', () => {
	it('Should be defined as a function', () => {
		expect(function () {
			createEvent('test', 'component');
		}).not.toThrow();
	});

	it('Should work as expected', () => {
		var event = createEvent('test', 'component');
		expect(event.type).toEqual('component:test');
	});

	it('Should work as expected, with custom parameters', () => {
		var event = createEvent('test', 'component', {
			bubbles: true,
			detail: {
				hazcheeseburger: true
			}
		});
		expect(event.type).toEqual('component:test');
		expect(event.bubbles).toEqual(true);
		expect(event.detail).toEqual({hazcheeseburger: true});
	});

	it('Should throw when no namespace defined', () => {
		expect(function () {
			createEvent('test');
		}).toThrowError(new Error('Missing namespace in `createEvent` function'));
	});

	it('Should be possible to call .preventDefault', () => {
		var event = createEvent('test', 'component', {cancelable: true});
		event.preventDefault();
		expect(event.defaultPrevented).toEqual(true);
	});

	it('Should be NOT be possible to call .preventDefault if cancelable not set', () => {
		var event = createEvent('test', 'component');
		event.preventDefault();
		expect(event.defaultPrevented).toEqual(false);
	});
});

describe('createEvent: customEvent NOT supported', () => {
	const originalCustomEvent = window.CustomEvent;

	beforeEach(() => {
		window.CustomEvent = null;
	});

	afterEach(() => {
		window.CustomEvent = originalCustomEvent;
	});

	it('Should be defined as a function', () => {
		expect(function () {
			createEvent('test', 'component');
		}).not.toThrow();
	});

	it('Should work as expected', () => {
		var event = createEvent('test', 'component');
		expect(event.type).toEqual('component:test');
	});

	it('Should work as expected, with custom parameters', () => {
		var event = createEvent('test', 'component', {
			bubbles: true,
			detail: {
				hazcheeseburger: true
			}
		});
		expect(event.type).toEqual('component:test');
		expect(event.bubbles).toEqual(true);
		expect(event.detail).toEqual({hazcheeseburger: true});
	});

	it('Should throw when no namespace defined', () => {
		expect(function () {
			createEvent('test');
		}).toThrowError(new Error('Missing namespace in `createEvent` function'));
	});

	it('Should be possible to call .preventDefault', () => {
		var event = createEvent('test', 'component', {cancelable: true});
		event.preventDefault();
		expect(event.defaultPrevented).toEqual(true);
	});

	it('Should be NOT be possible to call .preventDefault if cancelable not set', () => {
		var event = createEvent('test', 'component');
		event.preventDefault();
		expect(event.defaultPrevented).toEqual(false);
	});
});