/**
 * @param {function} func - function to execute
 * @param {Object} options
 * @param {number | string} options.wait - Time in ms
 * @param {Boolean} options.immediate - Whether the func should be called immediately
 * @return {function} - debounced function
 */

export const debounce = (func, {wait = 'raf', immediate = false} = {}) => {
	const raf = (wait === 'raf');

	if (!raf && typeof wait !== 'number') {
		return;
	}

	let timeout;

	// Return a function to run debounced
	return function () {
		let context = this;
		let args = arguments; // eslint-disable-line unicorn/prevent-abbreviations
		const later = () => {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		const callNow = immediate && !timeout;

		// If there's a timer, cancel it
		if (timeout) {
			if (raf) {
				window.cancelAnimationFrame(timeout);
			} else {
				console.log('into clear timeout');
				clearTimeout(timeout);
			}
		}

		timeout = raf ? window.requestAnimationFrame(() => func.apply(context, args)) : setTimeout(later, wait);

		if (callNow) {
			func.apply(context, args);
		}
	};
};
