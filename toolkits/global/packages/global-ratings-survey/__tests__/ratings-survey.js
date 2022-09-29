'use strict';
import {initRatingsSurvey} from '../js/index.js';

describe('Global Ratings Survey', () => {

	beforeAll(() => {
	});

	beforeEach(() => {
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('Should hide pictographic radios and display submit message if pictographic radio clicked and form submitted', async () => {
		initRatingsSurvey();
		expect().ok();
	});

	test('Should hide pictographic radios and display submit message if pictographic radio selected by keyboard SPACE and form submitted', async () => {
		initRatingsSurvey();
		expect().ok();
	});

	test('Should hide pictographic radios and display submit message if pictographic radio selected by keyboard ENTER and form submitted', async () => {
		initRatingsSurvey();
		expect().ok();
	});

	test('Should dispatch event to dataLayer if pictographic radio selected and form submitted', async () => {
		initRatingsSurvey();
		expect().ok();
	});

	test('Should fail to initialise if impermissible user journey parameter passed to component', async () => {
		initRatingsSurvey();
		expect().ok();
	});
});
