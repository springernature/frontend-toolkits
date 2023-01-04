class CustomerSatisfactionInput {
	constructor(aside) {
		this._aside = aside;
		this._form = this._aside.querySelector('form');
		this._formRadioFieldset = this._form.querySelector('fieldset');
		this._formRadios = Array.from(this._form.querySelectorAll('[data-customer-satisfaction-input="radio"]'));
		this._surveyLink = this._form.querySelector('[data-customer-satisfaction-input="survey-link"]');
		this._surveyLink.href = this._getSurveyLinkHref();
		this._submitButton = this._form.querySelector('button[type="submit"]');
		this._submitMessage = this._form.querySelector('[data-customer-satisfaction-input="submit-message"]');
		this._permissibleUserJourneys = ['get prepared to publish', 'get published', 'discover relevant scholarly content', 'manage my editorial work', 'manage my peer reviews', 'promote my work', 'evaluate the performance of scholarly work', 'manage an apc', 'buy something', 'access what i am entitled to', 'librarian get the information i need', 'librarian assess the performance and use of my portfolio', 'librarian buy something'];
		this._bindEvents();
	}

	_getCheckedRadioValue() {
		return this._formRadios.find(element => element.checked).value;
	}

	_getSurveyLinkHref() {
		return this._surveyLink.href + '?location=' + window.location.href.split('?')[0];
	}

	_getUserJourneys() {
		if (!this._aside.dataset.customerSatisfactionInputUserJourneys) {
			console.error('Attempt to send Global Customer Satisfaction Input event failed. Value not found for User Journeys.');
			return;
		}
		const userJourneyStrings = this._aside.dataset.customerSatisfactionInputUserJourneys.split(',');
		const sanitisedUserJourneyStrings = userJourneyStrings.map(string => string.trim().toLowerCase());
		const containsPermissibleUserJourneys = sanitisedUserJourneyStrings.every(string => {
			return this._permissibleUserJourneys.includes(string);
		});
		if (containsPermissibleUserJourneys) {
			return sanitisedUserJourneyStrings.join(',');
		}
		console.error('Attempt to send Global Customer Satisfaction Input event failed. One or more of the user journeys provided are not permissible values.');
		return false;
	}

	_dispatchDataLayerEvent(radioValue) {
		if (!window.dataLayer) {
			console.error('Attempt to send Global Customer Satisfaction Input event failed. window.dataLayer does not exist.');
			return;
		}
		const userJourneys = this._getUserJourneys();
		if (userJourneys && radioValue) {
			window.dataLayer.push({
				// this event name corresponds to the GTM trigger setup for this solution
				event: 'survey.track',
				userJourneys: userJourneys,
				radioValue: radioValue,
				additionalInfo: this._aside.dataset.customerSatisfactionInputAdditionalInfo || null
			});
		}
	}

	_displayMessage() {
		this._submitButton.classList.add('u-hide');
		this._formRadioFieldset.classList.add('u-hide');
		this._submitMessage.classList.remove('u-hide');
	}

	_bindEvents() {
		this._form.addEventListener('submit', event => {
			event.preventDefault();
			event.stopPropagation();
		});
		['click', 'keydown'].forEach(eventType => {
			this._submitButton.addEventListener(eventType, event => {
				if (/Enter|Space/.test(event.key) || event.type === 'click') {
					event.preventDefault();
					event.stopPropagation();
					const validForm = this._validateForm();
					if (validForm) {
						this._dispatchDataLayerEvent(this._getCheckedRadioValue());
						this._displayMessage();
						return;
					}
					this._displayError();
				}
			});
		});
	}

	_validateForm() {
		return this._formRadios.some(element => {
			return element.checked;
		});
	}

	_displayError() {
		if (this._form.classList.contains('c-customer-satisfaction-input--show-error')) {
			return;
		}
		this._form.classList.add('c-customer-satisfaction-input--show-error');
	}
}

export {CustomerSatisfactionInput};
