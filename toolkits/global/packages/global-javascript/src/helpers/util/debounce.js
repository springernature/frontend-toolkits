/**
 * @param {function} function_ - function to execute
 * @param {Object} options
 * @param {number | string} options.wait - Time in ms, defaults to 'raf'
 * @param {Boolean} options.immediate - Whether the func should be called immediately, defaults to false
 * @return {function} - debounced function
 */

export const debounce = (function_, {wait = 'raf', immediate = false} = {}) => {
	const raf = (wait === 'raf');

	if (!raf && typeof wait !== 'number') {
		return;
	}

	let timeout;

	// Return a function to run debounced
	return (...arguments_) => {
		const later = () => {
			timeout = undefined;
			if (!immediate) {
				function_.apply(this, arguments_);
			}
		};
		const callNow = immediate && !timeout;

		// If there's a timer, cancel it
		if (timeout) {
			if (raf) {
				window.cancelAnimationFrame(timeout);
			} else {
				clearTimeout(timeout);
			}
		}

		timeout = raf ? window.requestAnimationFrame(() => function_.apply(this, arguments_)) : setTimeout(later, wait);

		if (callNow) {
			function_.apply(this, arguments_);
		}
	};
};
