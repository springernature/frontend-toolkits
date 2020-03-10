const Scheduler = require('../js/scheduler');

let readyState = 'complete';

Object.defineProperty(document, 'readyState', {
	get() { return readyState; }
});

describe('Scheduler', () => {
	let scheduler;
	let addEventListenerSpy;
	let removeEventListenerSpy;
	let requestAnimationFrameSpy;
	let cancelAnimationFrameSpy;

	beforeEach(() => {
		addEventListenerSpy = jest.spyOn(window, 'addEventListener');
		removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
		requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
		cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');
		scheduler = Scheduler();
	});

	afterEach(() => {
		addEventListenerSpy.mockRestore();
		removeEventListenerSpy.mockRestore();
		requestAnimationFrameSpy.mockRestore();
		cancelAnimationFrameSpy.mockRestore();
		scheduler.reset();
	});

	test('Should be able to initiate Scheduler', () => {
		expect(scheduler.on).toBeDefined();
		expect(scheduler.off).toBeDefined();
		expect(scheduler.notify).toBeDefined();
		expect(scheduler.reset).toBeDefined();
	});

	it('Should bind a single event listener to the window when registering an event', () => {
		scheduler.on('resize', jest.fn());
		scheduler.on('resize', jest.fn());
		scheduler.on('resize', jest.fn());
		scheduler.on('scroll', jest.fn());
		scheduler.on('scroll', jest.fn());
		expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
		expect(addEventListenerSpy.mock.calls[0][0]).toBe('resize');
		expect(addEventListenerSpy.mock.calls[1][0]).toBe('scroll');
	});

	it('Should bind a single event listener to the window when registering an event (reseting state between tests)', () => {
		scheduler.on('scroll', jest.fn());
		scheduler.on('orientationchange', jest.fn());
		scheduler.on('scroll', jest.fn());
		expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
		expect(addEventListenerSpy.mock.calls[0][0]).toBe('scroll');
		expect(addEventListenerSpy.mock.calls[1][0]).toBe('orientationchange');
	});

	it('Should support binding events as a space sepatated list', () => {
		scheduler.on('resize scroll', jest.fn());
		expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
		expect(addEventListenerSpy.mock.calls[0][0]).toBe('resize');
		expect(addEventListenerSpy.mock.calls[1][0]).toBe('scroll');
	});

	it('Should support binding namespaced events', () => {
		scheduler.on('resize.mywidget scroll.app', jest.fn());
		expect(addEventListenerSpy).toHaveBeenCalledTimes(2);
		expect(addEventListenerSpy.mock.calls[0][0]).toBe('resize');
		expect(addEventListenerSpy.mock.calls[1][0]).toBe('scroll');
	});

	it('Should support binding a load event if load has not yet happened', () => {
		readyState = 'loading';
		scheduler.on('load', jest.fn());
		expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
		expect(addEventListenerSpy.mock.calls[0][0]).toBe('load');
	});

	it('Should immediately invoke requestAnimationFrame for a load event if load has already fired', () => {
		readyState = 'complete';
		const callback = jest.fn();
		scheduler.on('load', callback);
		expect(addEventListenerSpy).toHaveBeenCalledTimes(0);
		expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
		requestAnimationFrameSpy.mock.calls[0][0]();
		expect(callback).toHaveBeenCalledWith({type: 'load'});
	});

	it('Should immediately invoke requestAnimationFrame for a load event with a namespace if load has already fired', () => {
		readyState = 'complete';
		const callback = jest.fn();
		scheduler.on('load.myapp', callback);
		expect(addEventListenerSpy).toHaveBeenCalledTimes(0);
		expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
		requestAnimationFrameSpy.mock.calls[0][0]();
		expect(callback).toHaveBeenCalledWith({type: 'load'});
	});

	it('Should trigger notify from the bound event listener', () => {
		const callback = jest.fn();
		const notify = jest.spyOn(scheduler, 'notify');
		const event = {
			type: 'scroll'
		};

		scheduler.on('scroll', callback);
		addEventListenerSpy.mock.calls[0][1](event);
		expect(notify).toHaveBeenCalledTimes(1);
		expect(notify).toHaveBeenCalledWith('scroll', event);
		notify.mockRestore();
	});

	it('Should notify handlers from requestAnimationFrame', () => {
		const callback = jest.fn();
		const event = {
			type: 'scroll'
		};

		scheduler.on('scroll', callback);
		scheduler.notify('scroll', event);
		expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
		requestAnimationFrameSpy.mock.calls[0][0]();
		expect(callback).toHaveBeenCalledWith(event);
	});

	it('Should return a count of how many event handlers were removed', () => {
		const callback1 = jest.fn();
		const callback2 = jest.fn();
		scheduler.on('scroll', callback1);
		scheduler.on('orientationchange', callback2);
		expect(scheduler.off('scroll orientationchange')).toBe(2);
		expect(scheduler.off('resize')).toBe(0);
	});

	it('Should allow an individual handler to be removed', () => {
		const callback = jest.fn();
		const event = {
			type: 'scroll'
		};

		scheduler.on('scroll', callback);
		scheduler.off('scroll', callback);
		scheduler.notify('scroll', event);
		expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(0);
	});

	it('Should allow all events of a given type to be removed', () => {
		const callback1 = jest.fn();
		const callback2 = jest.fn();
		const event = {
			type: 'scroll'
		};

		scheduler.on('scroll', callback1);
		scheduler.on('scroll', callback2);
		scheduler.off('scroll');
		scheduler.notify('scroll', event);
		expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(0);
	});

	it('Should allow events within a namespace to be removed', () => {
		const callback1 = jest.fn();
		const callback2 = jest.fn();
		const callback3 = jest.fn();
		const event = {
			type: 'scroll'
		};

		scheduler.on('scroll', callback1);
		scheduler.on('scroll.foo', callback2);
		scheduler.on('scroll.foo', callback3);
		scheduler.off('scroll.foo');
		scheduler.notify('scroll', event);
		expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
		requestAnimationFrameSpy.mock.calls[0][0]();
		expect(callback1).toHaveBeenCalledWith(event);
		expect(callback2).not.toHaveBeenCalled();
		expect(callback3).not.toHaveBeenCalled();
	});

	it('Should allow an individual event within a namespace to be removed', () => {
		const callback1 = jest.fn();
		const callback2 = jest.fn();
		const callback3 = jest.fn();
		const event = {
			type: 'scroll'
		};

		scheduler.on('scroll', callback1);
		scheduler.on('scroll.foo', callback2);
		scheduler.on('scroll.foo', callback3);
		scheduler.off('scroll.foo', callback3);
		scheduler.notify('scroll', event);
		expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
		requestAnimationFrameSpy.mock.calls[0][0]();
		expect(callback1).toHaveBeenCalledWith(event);
		expect(callback2).toHaveBeenCalledWith(event);
		expect(callback3).not.toHaveBeenCalled();
	});

	it('Should unregister event listeners on reset', () => {
		const callback = jest.fn();
		const event = {
			type: 'scroll'
		};

		scheduler.on('scroll', callback);
		scheduler.reset();
		expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
		expect(removeEventListenerSpy.mock.calls[0][0]).toBe('scroll');
	});

	it('Should cancel any pending animation frames on reset', () => {
		const callback = jest.fn();
		const event = {
			type: 'scroll'
		};

		scheduler.on('scroll', callback);
		scheduler.notify('scroll', event);
		expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
		scheduler.reset();
		expect(cancelAnimationFrameSpy).toHaveBeenCalledTimes(1);
	});
});
