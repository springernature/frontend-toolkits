/**
 * @param {function} func - function to execute
 * @param {number} wait - timeout to execute
 * @return {function} - throttled function
 */

export const throttle = (func, wait = 100) => {
	let timer = null;
	// not arrow function due to 'this' value
	return function (...args) { // eslint-disable-line unicorn/prevent-abbreviations
		if (timer === null) {
			timer = setTimeout(() => {
				func.apply(this, args);
				timer = null;
			}, wait);
		}
	};
};
