'use strict';
import {customerSatisfactionInput} from '../js/index.js';
import * as qs from 'querystring';

const additionalInfo = 'some additional info';
const userJourneys = 'get prepared to publish';

const fixture = `
<aside class="u-hide u-js-show" data-customer-satisfaction-input="" data-customer-satisfaction-input-additional-info="${additionalInfo}" data-customer-satisfaction-input-user-journeys="${userJourneys}">
	<form>
		<fieldset>
			<div>
				<input type="radio" id="1" value="1" data-customer-satisfaction-input="radio">
				<label for="1"></label>
			</div>
			<div>
				<input type="radio" id="2" value="2" data-customer-satisfaction-input="radio">
				<label for="2"></label>
			</div>
			<div>
				<input type="radio" id="3" value="3" data-customer-satisfaction-input="radio">
				<label for="3"></label>
			</div>
			<div>
				<input type="radio" id="4" value="4" data-customer-satisfaction-input="radio">
				<label for="4"></label>
			</div>
			<div>
				<input type="radio" id="5" value="5" data-customer-satisfaction-input="radio">
				<label for="5"></label>
			</div>
		</fieldset>
		<button class="u-hide" type="submit"></button>
		<div class="u-hide" data-customer-satisfaction-input="submit-message">
			<a href="https://www.surveymonkey.com/1" data-customer-satisfaction-input="survey-link"></a>
		</div>
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

describe('Global Customer Satisfaction Input', () => {
	let aside, form, fieldset, button, label, input, message, surveyLink;

	beforeEach(() => {
		document.body.innerHTML = fixture;
		window.dataLayer = [];
		aside = document.querySelector('aside');
		form = document.querySelector('form');
		fieldset = document.querySelector('fieldset');
		button = document.querySelector('button');
		label = document.querySelector('label');
		input = document.querySelector('input');
		message = document.querySelector('[data-customer-satisfaction-input="submit-message"]');
		surveyLink = document.querySelector('[data-customer-satisfaction-input="survey-link"]');
		jest.spyOn(global.console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		document.body.innerHTML = '';
		global.console.error.mockRestore();
	});

	test('Should hide pictographic radios and display submit message if pictographic radio clicked and form submitted', () => {
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		customerSatisfactionInput();
		label.click();
		button.click();
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
	});

	test('Should hide pictographic radios and display submit message if pictographic radio selected form submitted by keyboard SPACE on submit button', () => {
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		customerSatisfactionInput();
		input.checked = true;
		const keydownSpace = createKeydownEvent('Space');
		button.dispatchEvent(keydownSpace);
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
		customerSatisfactionInput();
	});

	test('Should hide pictographic radios and display submit message if pictographic radio selected form submitted by keyboard ENTER on submit button', () => {
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		customerSatisfactionInput();
		input.checked = true;
		const keydownEnter = createKeydownEvent('Enter');
		button.dispatchEvent(keydownEnter);
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
		customerSatisfactionInput();
	});

	test('Should dispatch event to dataLayer if pictographic radio selected and form submitted', () => {
		expect(window.dataLayer).toEqual([]);
		customerSatisfactionInput();
		label.click();
		button.click();
		const expectedValue =
			[{
				additionalInfo,
				event: 'survey.track',
				radioValue: '1',
				userJourneys
			}];
		expect(window.dataLayer).toEqual(expectedValue);
	});

	test('Should trim and lowercase user journey values before dispatching them in a dataLayer event', () => {
		expect(window.dataLayer).toEqual([]);
		aside.dataset.customerSatisfactionInputUserJourneys = ` ${userJourneys.toUpperCase()} `;
		customerSatisfactionInput();
		label.click();
		button.click();
		const expectedValue =
			[{
				additionalInfo,
				event: 'survey.track',
				radioValue: '1',
				userJourneys
			}];
		expect(window.dataLayer).toEqual(expectedValue);
	});

	test('Should process comma separated user journey values correctly before dispatching them in a dataLayer event', () => {
		expect(window.dataLayer).toEqual([]);
		aside.dataset.customerSatisfactionInputUserJourneys = `${userJourneys}, get published`;
		customerSatisfactionInput();
		label.click();
		button.click();
		const expectedValue =
			[{
				additionalInfo,
				event: 'survey.track',
				radioValue: '1',
				userJourneys: `${userJourneys},get published`
			}];
		expect(window.dataLayer).toEqual(expectedValue);
	});

	test('Should produce console error if no user journey parameter passed to component', () => {
		aside.dataset.customerSatisfactionInputUserJourneys = '';
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		customerSatisfactionInput();
		label.click();
		button.click();
		expect(console.error).toBeCalledTimes(2);
		expect(console.error).toBeCalledWith('Attempt to send Global Customer Satisfaction Input event failed. Value not found for User Journeys.');
		// Also asserting that, from the user's perspective, it fails silently
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
	});

	test('Should produce console error if impermissible user journey parameter passed to component', () => {
		aside.dataset.customerSatisfactionInputUserJourneys = 'steve';
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		customerSatisfactionInput();
		label.click();
		button.click();
		expect(console.error).toBeCalledTimes(2);
		expect(console.error).toBeCalledWith('Attempt to send Global Customer Satisfaction Input event failed. One or more of the user journeys provided are not permissible values.');
		// Also asserting that, from the user's perspective, it fails silently
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
	});

	test('Should produce console error if dataLayer does not exist', () => {
		window.dataLayer = null;
		expect(fieldset.classList.contains('u-hide')).toBe(false);
		expect(message.classList.contains('u-hide')).toBe(true);
		customerSatisfactionInput();
		label.click();
		button.click();
		expect(console.error).toBeCalledTimes(1);
		expect(console.error).toBeCalledWith('Attempt to send Global Customer Satisfaction Input event failed. window.dataLayer does not exist.');
		// Also asserting that, from the user's perspective, it fails silently
		expect(fieldset.classList.contains('u-hide')).toBe(true);
		expect(message.classList.contains('u-hide')).toBe(false);
	});

	test('Should get the current location and add it as a query parameter to the survey link', () => {
		expect(surveyLink.href === 'https://www.surveymonkey.com/1').toBe(true);
		const location = 'http://localhost/';
		window.location.href = `${location}?shafkjsahfh`;
		customerSatisfactionInput();
		const url = new URL(surveyLink.href);
		expect(url.searchParams.get('location')).toEqual(location);
	})

	test('Should get the selected rating and add it as a query parameter to the survey link', () => {
		const rating = 3
		customerSatisfactionInput();

		clickOnRating(rating)
		button.click();
		expect(surveyLink.href).toContain(`responseRating=${rating}`);
	})


	test('Should get the additional info and add it as a query parameter to the survey link', () => {
		customerSatisfactionInput();
		label.click();
		button.click();
		const url = new URL(surveyLink.href);
		expect(url.searchParams.get('additionalInfo')).toEqual(additionalInfo);
	})

	test('Should get the user journeys and add it as a query parameter to the survey link', () => {
		customerSatisfactionInput();
		label.click();
		button.click();
		const url = new URL(surveyLink.href);
		expect(url.searchParams.get('userJourneys')).toEqual(userJourneys);
	})

	function clickOnRating(rating) {
		document.querySelectorAll('label')[rating - 1].click();
	}
});
