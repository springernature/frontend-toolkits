import {setCookie} from './set-cookie';

export const deleteCookie = (name, options = {}) => {
	const {domain, path} = options;
	const setCookieOptions = {
		expires: 'Thu, 01 Jan 1970 00:00:00 GMT'
	};

	if (domain) {
		setCookieOptions.domain = domain;
	}

	if (path) {
		setCookieOptions.path = path;
	}

	setCookie(name, '', setCookieOptions);
};
