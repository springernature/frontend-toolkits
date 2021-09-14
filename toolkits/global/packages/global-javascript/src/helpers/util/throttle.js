/**
 * @param {function} function_ - function to execute
 * @param {number} wait - timeout to execute
 * @return {function} - throttled function
 */

export const throttle = (function_, wait = 100) => {
	let timer;
	// not arrow function due to 'this' value
	return function (...args) { // eslint-disable-line unicorn/prevent-abbreviations
		if (timer === null) {
			timer = setTimeout(() => {
				function_.apply(this, args);
				timer = undefined;
			}, wait);
		}
	};
};
