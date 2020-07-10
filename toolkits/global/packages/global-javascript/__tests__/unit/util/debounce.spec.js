import {debounce} from "../../../src/helpers";

beforeEach(() => jest.useFakeTimers());

describe('debounce', () => {
	test('Should not call func if time is less that the wait time', () => {
		const func = jest.fn();
		const debouncedCallback = debounce(func, 500, false);

		// Call it several times with 100ms between each call
		for(let i = 0; i < 5; i++) {
			jest.advanceTimersByTime(100);
			debouncedCallback();
		}

		// Fast-forward to wait time
		jest.advanceTimersByTime(500);

		expect(func).toHaveBeenCalledTimes(1);
	});

	test('immediate falsey', () => {
		const func = jest.fn();
		const debouncedCallback = debounce(func, 200, false);

		debouncedCallback();
		expect(func).not.toBeCalled();

		// Fast-forward until all timers have been executed
		jest.runAllTimers();

		expect(func).toBeCalled();
		expect(func).toHaveBeenCalledTimes(1);
	});

	test('immediate truthy', () => {
		const func = jest.fn();
		const debouncedCallback = debounce(func, 200, true);

		debouncedCallback();
		expect(func).toBeCalled();

		// Fast-forward until all timers have been executed
		jest.runAllTimers();

		expect(func).toHaveBeenCalledTimes(1);
	});
});
