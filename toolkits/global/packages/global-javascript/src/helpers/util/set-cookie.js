/**
 * @param {string} name - The name / key of the cookie
 * @param {string} value - The value of the cookie
 * @param {Object} [options] - The attribute values for the cookie. See https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie for attribute descriptions
 * @param {string} [options.path]
 * @param {string} [options.domain]
 * @param {string} [options.max-age]
 * @param {string} [options.expires]
 * @param {string} [options.secure]
 * @param {string} [options.samesite]
 */

export const setCookie = (name, value, options = {}) => {
	document.cookie = encodeURIComponent(name) +
		'=' + value +
		(options.path ? (';path=' + options.path) : '') +
		(options.domain ? (';domain=' + options.domain) : '') +
		(options['max-age'] ? (';max-age=' + options['max-age']) : '') +
		(options.expires ? (';expires=' + options.expires) : '') +
		(options.secure ? (';secure') : '') +
		(options.samesite ? (';samesite=' + options.samesite) : '');
};
