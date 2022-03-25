import {debounce} from "../../../js/helpers";

describe('requestAnimationFrame', () => {
	test('Should not call func until the next animation frame after the last call', done => {
		const func = jest.fn();
		const debouncedFunc = debounce(func);

		for(let i = 0; i < 5; i++) {
			debouncedFunc();
		}

		expect(func).not.toHaveBeenCalled();

		window.requestAnimationFrame(() => {
			expect(func).toHaveBeenCalledTimes(1);
			done();
		});
	});

	test('When immediate is true, it should call func the first time', done => {
		const func = jest.fn();
		const debouncedFunc = debounce(func, {immediate: true});

		debouncedFunc();
		expect(func).toBeCalledTimes(1);

		// Call it several times with 100ms between each call
		for(let i = 0; i < 5; i++) {
			debouncedFunc();
		}

		window.requestAnimationFrame(() => {
			expect(func).toHaveBeenCalledTimes(2);
			done();
		});
	});
});

describe('setTimeout', () => {
	beforeEach(() => jest.useFakeTimers());

	test('Should not call func until the wait time has passed after the last call', () => {
		const func = jest.fn();
		const debouncedFunc = debounce(func, {wait: 200});

		// Call it several times with 100ms between each call
		for(let i = 0; i < 5; i++) {
			jest.advanceTimersByTime(100);
			debouncedFunc();
		}

		expect(func).not.toHaveBeenCalled();

		jest.runAllTimers();

		expect(func).toBeCalled();
		expect(func).toHaveBeenCalledTimes(1);
	});

	test('When immediate is true, it should call func the first time', () => {
		const func = jest.fn();
		const debouncedFunc = debounce(func, {wait: 200, immediate: true});

		debouncedFunc();
		expect(func).toBeCalledTimes(1);

		jest.runAllTimers();

		for(let i = 0; i < 5; i++) {
			jest.advanceTimersByTime(100);
			debouncedFunc();
		}

		jest.runAllTimers();

		expect(func).toHaveBeenCalledTimes(2);
	});
});





