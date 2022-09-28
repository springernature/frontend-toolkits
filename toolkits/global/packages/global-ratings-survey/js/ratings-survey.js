class RatingsSurvey {
	constructor(aside) {
		this._aside = aside;
		this._form = this._aside.querySelector('form');
		this._formRadioFieldset = this._form.querySelector('fieldset');
		this._formRadioLabels = this._form.querySelectorAll('[data-ratings-survey="radio"]+label');
		this._submitMessage = this._form.querySelector('[data-ratings-survey="submit-message"]');
		this._permissibleUserJourneys = ['getPublished', 'contentDiscovery'];
		this._bindEvents();
	}

	_getRadioValue(label) {
		return document.querySelector(`#${label.getAttribute('for')}`).value;
	}

	_getUserJourneys() {
		if (!this._aside.dataset.ratingsSurvey) {
			console.error('Global Ratings Survey component failed to initialise. Value not found for User Journeys.');
			return;
		}
		const userJourneyStrings = this._aside.dataset.ratingsSurvey.split('-');
		const containsPermissibleUserJourneys = userJourneyStrings.every(string => {
			return this._permissibleUserJourneys.includes(string);
		});
		if (containsPermissibleUserJourneys) {
			return this._aside.dataset.ratingsSurvey;
		}
		console.error('Global Ratings Survey component failed to initialise. One or more of the user journeys provided are not permissible values.');
		return false;
	}

	_dispatchDataLayerEvent(label) {
		if (!window.dataLayer) {
			console.error('Attempt to send Global Ratings Survey event failed. window.dataLayer does not exist.');
			return;
		}
		const userJourneys = this._getUserJourneys();
		const radioValue = this._getRadioValue(label);
		if (userJourneys && radioValue) {
			window.dataLayer.push({
				// this event name corresponds to the GTM trigger setup for this solution
				event: 'survey.track',
				userJourneys: userJourneys,
				radioValue: radioValue
			});
		}
	}

	_displayMessage() {
		this._formRadioFieldset.classList.add('u-hide');
		this._submitMessage.classList.remove('u-hide');
	}

	_bindEvents() {
		this._formRadioLabels.forEach(label => {
			label.addEventListener('click', () => {
				this._dispatchDataLayerEvent(label);
				this._displayMessage();
			});
		});
	}
}

export {RatingsSurvey};
