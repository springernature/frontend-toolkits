import {RatingsSurvey} from './ratings-survey';

const init = () => {
	const asides = document.querySelectorAll('aside[data-ratings-survey]');

	asides.forEach(aside => {
		/* eslint-disable no-new */
		new RatingsSurvey(aside);
		/* eslint-enable no-new */
	});
};

export {init as ratingSurveys};

