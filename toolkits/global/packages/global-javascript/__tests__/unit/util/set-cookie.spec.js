import {setCookie} from '../../../src/helpers';

describe('setCookie', () => {
	const originalDocumentCookie = window.document.cookie;

	beforeEach(() => {
		Object.defineProperty(window.document, 'cookie', {
			writable: true,
			value: ''
		});
	});

	afterEach(() => window.document.cookie = originalDocumentCookie);

	test('Should set cookie', () => {
		setCookie('test-cookie', 'test-value');
		expect(document.cookie).toBe('test-cookie=test-value')
	});

	test('Should set cookie with options', () => {
		setCookie('test-cookie', 'test-value', {path: '/test-path', domain: 'test-domain'});
		expect(document.cookie).toBe('test-cookie=test-value;path=/test-path;domain=test-domain')
	});
});


