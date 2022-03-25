import {deleteCookie} from "../../../js/helpers/util/delete-cookie";
import {setCookie} from "../../../js/helpers/util/set-cookie";
jest.mock('../../../js/helpers/util/set-cookie');

describe('deleteCookie', () => {
	test('Should call setCookie with empty value and a past expires date', () => {
		deleteCookie('my-cookie');
		expect(setCookie).toBeCalledWith('my-cookie', '', {expires: 'Thu, 01 Jan 1970 00:00:00 GMT'});
	});

	test('Should call setCookie with domain and path if set', () => {
		const deleteCookieOptions = {
			path: '/',
			domain: 'my-domain.com'
		};

		const setCookieOptions = Object.assign(deleteCookieOptions, {expires: 'Thu, 01 Jan 1970 00:00:00 GMT'});

		deleteCookie('my-cookie', deleteCookieOptions);
		expect(setCookie).toBeCalledWith('my-cookie', '', setCookieOptions);
	});
});

