/**
 * @param {string} name - name of cookie
 * @returns {string} - value of the cookie
 */

export const getCookie = name => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop().split(';').shift();
	}
};
