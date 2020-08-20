import {getCookie} from './get-cookie';

/**
 * onetrust.js
 * @param {string} category - name of OneTrust category
 * @return {boolean}
 */

const checkConsent = category => {
	const validCategories = {
		strictlyNecessary: 'C0001',
		performance: 'C0002',
		functional: 'C0003',
		targetingFirstParty: 'C0008',
		targetingThirdParty: 'C0009'
	};

	if (!validCategories[category]) {
		throw new Error('Invalid category: ' + category);
	}

	const consent = getCookie('OptanonConsent');
	
	if (consent) {
		const consentGroups = consent.split('groups=').pop().split('&')[0];
		const colonEncoding = '%3A';

		return consentGroups.includes(validCategories[category] + colonEncoding + '1');
	}
};

/**
 * isConsentBannerClosed
 * @return {boolean}
 */

const isConsentBannerClosed = () => Boolean(getCookie('OptanonAlertBoxClosed'));

export {checkConsent, isConsentBannerClosed};
