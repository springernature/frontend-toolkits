class RatingsSurvey {
	constructor(form) {
		this._form = form;
		this._formRadioFieldset = form.querySelector('fieldset');
		this._formRadioLabels = form.querySelectorAll('[data-ratings-survey="radio"]+label');
		this._submitMessage = form.querySelector('[data-ratings-survey="submit-message"]');
		this._bindEvents();
	}

	_getRadioValue(label) {
		return document.querySelector(`#${label.getAttribute('for')}`).value;
	}

	_dispatchDataLayerEvent(label) {
		if (!window.dataLayer) {
			console.error('Attempt to send Global Ratings Survey event failed. window.dataLayer does not exist.');
			return;
		}
		window.dataLayer.push({
			// this event name corresponds to the GTM trigger setup for this solution
			event: 'survey.track',
			id: `${this._form.dataset.ratingsSurvey}`,
			value: `${this._getRadioValue(label)}`
		});
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
