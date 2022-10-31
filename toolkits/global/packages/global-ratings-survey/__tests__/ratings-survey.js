'use strict';
import {ratingSurveys} from '../js/index.js';

const fixture = `
<aside class="u-hide u-js-show" data-ratings-survey="" data-ratings-survey-user-journeys="get prepared to publish">
	<form>
		<fieldset>
			<div>
				<input type="radio" id="1" value="1" data-ratings-survey="radio">
				<label for="1"></label>
			</div>
			<div>
				<input type="radio" id="2" value="2" data-ratings-survey="radio">
				<label for="2"></label>
			</div>
			<div>
				<input type="radio" id="3" value="3" data-ratings-survey="radio">
				<label for="3"></label>
			</div>
			<div>
				<input type="radio" id="4" value="4" data-ratings-survey="radio">
				<label for="4"></label>
			</div>
			<div>
				<input type="radio" id="5" value="5" data-ratings-survey="radio">
				<label for="5"></label>
			</div>
		</fieldset>
		<button class="u-hide" type="submit"></button>
		<div class="u-hide" data-ratings-survey="submit-message"></div>
	</form>
</aside>`;

function createKeydownEvent(key) {
	const event = new Event('keydown', {
		bubbles: true
	});
	switch (key) {
		case 'Enter':
			event.key = 'Enter';
			break;
		case 'Space':
			event.key = 'Space';
			break;
		default:
			break;
	}
	return event;
}

describe('Global Ratings Survey', () => {
	let aside, form, fieldset, button, label, input, message;

	beforeEach(() => {
		document.body.innerHTML = fixture;
		window.dataLayer = [];
		aside = document.querySelector('aside');
		form = document.querySelector('form');
		fieldset = document.querySelector('fieldset');
		button = document.querySelector('button');
		label = document.querySelector('label');
		input = document.querySelector('input');
		message = document.querySelector('[data-ratings-survey="submit-message"]');
		jest.spyOn(global.console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		document.body.innerHTML = '';
		global.console.error.mockRestore();
	});

	test('Should hide pictographic radios and display submit message if pictographic radio clicked and form submitted', () => {
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		ratingSurveys();
		label.click();
		button.click();
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
	});

	test('Should hide pictographic radios and display submit message if pictographic radio selected form submitted by keyboard SPACE on submit button', () => {
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		ratingSurveys();
		input.checked = true;
		const keydownSpace = createKeydownEvent('Space');
		button.dispatchEvent(keydownSpace);
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
		ratingSurveys();
	});

	test('Should hide pictographic radios and display submit message if pictographic radio selected form submitted by keyboard ENTER on submit button', () => {
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		ratingSurveys();
		input.checked = true;
		const keydownEnter = createKeydownEvent('Enter');
		button.dispatchEvent(keydownEnter);
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
		ratingSurveys();
	});

	test('Should dispatch event to dataLayer if pictographic radio selected and form submitted', () => {
		expect(window.dataLayer).toEqual([]);
		ratingSurveys();
		label.click();
		button.click();
		const expectedValue =
			[{
				additionalInfo: null,
				event: 'survey.track',
				radioValue: '1',
				userJourneys: 'get prepared to publish'
			}];
		expect(window.dataLayer).toEqual(expectedValue);
	});

	test('Should trim and lowercase user journey values before dispatching them in a dataLayer event', () => {
		expect(window.dataLayer).toEqual([]);
		aside.dataset.ratingsSurveyUserJourneys = ' GET PREPARED TO PUBLISH ';
		ratingSurveys();
		label.click();
		button.click();
		const expectedValue =
			[{
				additionalInfo: null,
				event: 'survey.track',
				radioValue: '1',
				userJourneys: 'get prepared to publish'
			}];
		expect(window.dataLayer).toEqual(expectedValue);
	});

	test('Should process comma separated user journey values correctly before dispatching them in a dataLayer event', () => {
		expect(window.dataLayer).toEqual([]);
		aside.dataset.ratingsSurveyUserJourneys = 'get prepared to publish, get published';
		ratingSurveys();
		label.click();
		button.click();
		const expectedValue =
			[{
				additionalInfo: null,
				event: 'survey.track',
				radioValue: '1',
				userJourneys: 'get prepared to publish,get published'
			}];
		expect(window.dataLayer).toEqual(expectedValue);
	});

	test('Should produce console error if no user journey parameter passed to component', () => {
		aside.dataset.ratingsSurveyUserJourneys = '';
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		ratingSurveys();
		label.click();
		button.click();
		expect(console.error).toBeCalledTimes(1);
		expect(console.error).toBeCalledWith('Attempt to send Global Ratings Survey event failed. Value not found for User Journeys.');
		// Also asserting that, from the user's perspective, it fails silently
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
	});

	test('Should produce console error if impermissible user journey parameter passed to component', () => {
		aside.dataset.ratingsSurveyUserJourneys = 'steve';
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		ratingSurveys();
		label.click();
		button.click();
		expect(console.error).toBeCalledTimes(1);
		expect(console.error).toBeCalledWith('Attempt to send Global Ratings Survey event failed. One or more of the user journeys provided are not permissible values.');
		// Also asserting that, from the user's perspective, it fails silently
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
	});

	test('Should produce console error if dataLayer does not exist', () => {
		window.dataLayer = null;
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		ratingSurveys();
		label.click();
		button.click();
		expect(console.error).toBeCalledTimes(1);
		expect(console.error).toBeCalledWith('Attempt to send Global Ratings Survey event failed. window.dataLayer does not exist.');
		// Also asserting that, from the user's perspective, it fails silently
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
	});
});
