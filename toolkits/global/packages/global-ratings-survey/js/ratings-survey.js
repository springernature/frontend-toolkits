class RatingsSurvey {
	constructor(aside) {
		this._aside = aside;
		this._form = this._aside.querySelector('form');
		this._formRadioFieldset = this._form.querySelector('fieldset');
		this._formRadios = Array.from(this._form.querySelectorAll('[data-ratings-survey="radio"]'));
		this._submitButton = this._form.querySelector('button[type="submit"]');
		this._submitMessage = this._form.querySelector('[data-ratings-survey="submit-message"]');
		this._permissibleUserJourneys = ['get published', 'content discovery'];
		this._bindEvents();
	}

	_getCheckedRadioValue() {
		return this._formRadios.find(element => element.checked).value;
	}

	_getUserJourneys() {
		if (!this._aside.dataset.ratingsSurveyUserJourneys) {
			console.error('Attempt to send Global Ratings Survey event failed. Value not found for User Journeys.');
			return;
		}
		const userJourneyStrings = this._aside.dataset.ratingsSurveyUserJourneys.split(',');
		const sanitisedUserJourneyStrings = userJourneyStrings.map(string => string.trim().toLowerCase());
		const containsPermissibleUserJourneys = sanitisedUserJourneyStrings.every(string => {
			return this._permissibleUserJourneys.includes(string);
		});
		if (containsPermissibleUserJourneys) {
			return sanitisedUserJourneyStrings.join(',');
		}
		console.error('Attempt to send Global Ratings Survey event failed. One or more of the user journeys provided are not permissible values.');
		return false;
	}

	_dispatchDataLayerEvent(radioValue) {
		if (!window.dataLayer) {
			console.error('Attempt to send Global Ratings Survey event failed. window.dataLayer does not exist.');
			return;
		}
		const userJourneys = this._getUserJourneys();
		if (userJourneys && radioValue) {
			window.dataLayer.push({
				// this event name corresponds to the GTM trigger setup for this solution
				event: 'survey.track',
				userJourneys: userJourneys,
				radioValue: radioValue,
				additionalInfo: this._aside.dataset.ratingsSurveyAdditionalInfo || null
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
		if (this._form.classList.contains('c-ratings-survey--show-error')) {
			return;
		}
		this._form.classList.add('c-ratings-survey--show-error');
	}
}

export {RatingsSurvey};
