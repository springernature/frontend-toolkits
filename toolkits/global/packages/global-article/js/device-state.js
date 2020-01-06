/* global $ */

/**
 * Device State
 * return the current active media query
 *
 * Example usage:
 * $.deviceState(); returns active media query
 * $.deviceState({lt: 1200}) returns true if active media query is less than 1200
 * $.deviceState({gt: 875}) returns true if active media query is greater than 875
 *
 */

function DeviceState() {
	$.deviceState = function (opts) {
		var mq;

		if (window.getComputedStyle) {
			mq = window.getComputedStyle($('body')[0], ':before').content.replace(/"|'/g, ''); // regex strips double and single quotation marks
		} else {
			mq = 'full'; // assume full for < IE9
		}

		// return the current media query
		if (!opts) {
			return mq;
		}

		// convert media query to integer
		if (mq === 'full') {
			mq = 1201;
		} else {
			mq = parseInt(mq.replace(/^mq/, ''), 10);
		}

		// compare current to options
		if (opts.gt) {
			return mq > opts.gt;
		}
		if (opts.lt) {
			return mq < opts.lt;
		}

		return null;
	};
}

if (typeof module !== 'undefined') {
	module.exports = DeviceState;
}

