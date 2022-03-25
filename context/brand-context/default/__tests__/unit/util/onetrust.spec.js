import {checkConsent, isConsentBannerClosed} from "../../../js/helpers/util/onetrust";

describe('checkConsent', () => {
	const originalDocumentCookie = window.document.cookie;

	beforeEach(() => {
		Object.defineProperty(window.document, 'cookie', {
			writable: true,
			value: 'OptanonConsent=isIABGlobal=false&datestamp=Tue+Jul+14+2020+07%3A58%3A59+GMT%2B0100+(British+Summer+Time)&version=6.3.0&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A0%2CC0008%3A1%2CC0009%3A0&hosts=&legInt=&geolocation=%3B&AwaitingReconsent=false'
		});
	});

	afterEach(() => window.document.cookie = originalDocumentCookie);

	test('Should return boolean of each valid consent group set in the OptanonConsent cookie', () => {
		expect(checkConsent('strictlyNecessary')).toBe(true);
		expect(checkConsent('performance')).toBe(true);
		expect(checkConsent('functional')).toBe(false);
		expect(checkConsent('targetingFirstParty')).toBe(true);
		expect(checkConsent('targetingThirdParty')).toBe(false);
	});

	test('Should throw error if invalid group name passed in', () => {
		expect(() => {
			checkConsent('invalidGroupName');
		}).toThrowError();
	});
});

describe('isConsentBannerClosed', () => {
	const originalDocumentCookie = window.document.cookie;
	afterEach(() => window.document.cookie = originalDocumentCookie);

	test('Should return true if OptanonAlertBoxClosed cookie is set', () => {
		Object.defineProperty(window.document, 'cookie', {
			writable: true,
			value: 'OptanonAlertBoxClosed=2020-07-13T21:33:32.497Z'
		});

		expect(isConsentBannerClosed()).toBe(true);
	});

	test('Should return false if OptanonAlertBoxClosed cookie is not set', () => {
		expect(isConsentBannerClosed()).toBe(false);
	});
});
