import {debounce} from "../../../src/helpers";

beforeEach(() => jest.useFakeTimers());

describe('debounce', () => {
	test('Should not call callback if time is less that the wait time', () => {
		const callback = jest.fn();
		const debouncedCallback = debounce(callback, 500, false);

		// Call it several times with 500ms between each call
		for(let i = 0; i < 5; i++) {
			jest.advanceTimersByTime(250);
			debouncedCallback();
		}

		// Fast-forward to wait time
		jest.advanceTimersByTime(500);

		expect(callback).toHaveBeenCalledTimes(1);
	});

	test('immediate falsey', () => {
		const callback = jest.fn();
		const debouncedCallback = debounce(callback, 200, false);

		debouncedCallback();
		expect(callback).not.toBeCalled();

		// Fast-forward until all timers have been executed
		jest.runAllTimers();

		expect(callback).toBeCalled();
		expect(callback).toHaveBeenCalledTimes(1);
	});

	test('immediate truthy', () => {
		const callback = jest.fn();
		const debouncedCallback = debounce(callback, 200, true);

		debouncedCallback();
		expect(callback).toBeCalled();

		// Fast-forward until all timers have been executed
		jest.runAllTimers();

		expect(callback).toHaveBeenCalledTimes(1);
	});
});
