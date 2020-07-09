/**
 * @param  {function} func - function to execute
 * @param  {number} wait - timeout to execute
 * @param  {boolean} immediate - execute the callback immediately
 */

export const debounce = (func, wait, immediate) => {
	let timeout;

	return function () {
		const context = this;
		const args = arguments; // eslint-disable-line unicorn/prevent-abbreviations
		const later = function () {
			timeout = null;
			if (!immediate) {
				func.apply(context, args);
			}
		};
		const callNow = immediate && !timeout;

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) {
			func.apply(context, args);
		}
	};
};
