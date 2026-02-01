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
	const {path, domain, 'max-age': maxAge, expires, secure, samesite} = options;

	document.cookie = encodeURIComponent(name) +
		'=' + value +
		(path ? (';path=' + path) : '') +
		(domain ? (';domain=' + domain) : '') +
		(maxAge ? (';max-age=' + maxAge) : '') +
		(expires ? (';expires=' + expires) : '') +
		(secure ? (';secure') : '') +
		(samesite ? (';samesite=' + samesite) : '');
};
