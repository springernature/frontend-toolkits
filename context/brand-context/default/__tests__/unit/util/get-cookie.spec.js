import {getCookie} from "../../../js/helpers";

test('Should get cookie from document.cookie', () => {
	const cookieOne = '123456789';
	const cookieTwo = '987654321';
	const cookieThree = '2020-07-10stringstring';

	Object.defineProperty(window.document, 'cookie', {
		writable: true,
		value: `cookie-one=${cookieOne}; cookie-two=${cookieTwo}; cookie-three=${cookieThree};`
	});

	expect(getCookie('cookie-one')).toBe(cookieOne);
	expect(getCookie('cookie-two')).toBe(cookieTwo);
	expect(getCookie('cookie-three')).toBe(cookieThree);
});

