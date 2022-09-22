import {RatingsSurvey} from './ratings-survey';

const init = () => {
	const forms = document.querySelectorAll('form[data-ratings-survey]');

	forms.forEach(form => {
		/* eslint-disable no-new */
		new RatingsSurvey(form);
		/* eslint-enable no-new */
	});
};

export {init as ratingSurveys};

