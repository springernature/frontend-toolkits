import {throttle} from '../../../src/helpers';

beforeEach(() => jest.useFakeTimers());

describe('throttle', () => {
	test('Should only call func once within the wait time', () => {
		const func = jest.fn();
		const throttledFunc = throttle(func, 500);

		// Call it several times with 100ms between each call
		for(let i = 0; i < 5; i++) {
			jest.advanceTimersByTime(100);
			throttledFunc();
		}

		// Fast-forward to wait time
		jest.runAllTimers();

		expect(func).toHaveBeenCalledTimes(1);
	});

	test('Should call func if wait time has passed', () => {
		const func = jest.fn();
		const throttledFunc = throttle(func, 500);

		// Call it several times with 100ms between each call
		for(let i = 0; i < 5; i++) {
			jest.advanceTimersByTime(500);
			throttledFunc();
		}

		// Fast-forward to wait time
		jest.runAllTimers();

		expect(func).toHaveBeenCalledTimes(5);
	});
});
