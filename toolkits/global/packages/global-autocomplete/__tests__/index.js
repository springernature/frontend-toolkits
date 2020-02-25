'use strict';
import autoComplete from '../js/index.js';

describe('Autocomplete', () => {
		const url = 'https://www.something.com/autocomplete?q=';
		const expectedResults = ['albatrossman', 'angry beaker', 'alturistic flappyman'];
		const headers = {
			Accept: 'application/json; version=2'
		};
		const mockSelectCallback = jest.fn();
		const mockErrorCallback = jest.fn();
		const mockResultsCallback = jest.fn();
		const expectedResponse = {ok: true, status: 200, json: () => { return expectedResults }};
		const setMockFetch = response => {
			global.fetch = () => { return Promise.resolve(response) };
		};
		const page = {
			create: () => {
				let template = `<div><input type='text' class="c-autocomplete" autocomplete="off" placeholder="trowel handed swan"/></div>`;
				document.body.innerHTML = template;
			}
		};
		const waitFor = time => new Promise(resolve => setTimeout(resolve, time));

		const args = {
				selector: '.c-autocomplete',
				onSelect: mockSelectCallback,
				searchError: mockErrorCallback,
				resultsContainerSelector: '.c-results-container',
				resultSelector: '.c-results-container__result',
				resultsCallBack: mockResultsCallback,
				endpoint: url,
				minCars: 1,
				inputDelay: 0,
				headers: headers
		};
		let fetchSpy;
		let input;

		beforeAll(() => {
			setMockFetch(expectedResponse);
		});

		beforeEach(() => {
			page.create();
			input = document.querySelector('.c-autocomplete');

			fetchSpy = jest.spyOn(global, 'fetch');
		});

		afterEach(() => {
			document.body.innerHTML = '';
			fetchSpy.mockReset();
			fetchSpy.mockRestore();
			mockSelectCallback.mockReset();
			mockSelectCallback.mockRestore();
			mockResultsCallback.mockReset();
			mockResultsCallback.mockRestore();
		});

		describe('Typing into the text input', () => {
			test('Should by default send a GET request to the configured endpoint', async () => {
				let auto = autoComplete(args);
				auto.enable();
				input.value = 'burdmen';
				input.dispatchEvent(new Event('keyup'));

				await waitFor(2);
				expect(fetchSpy).toHaveBeenCalledWith(url + 'burdmen', {"content-type": "application/json", "headers": headers, "method": 'GET'});

			});

			test('Should send a request using the configured HTTP method and bodyTemplate', async () => {
				const bodyTemplate = term => {
					return {
						text: term,
						size: 20
					};
				};
				let auto = autoComplete({
					...args,
					httpMethod: 'POST',
					bodyTemplate,
				});
				auto.enable();
				input.value = 'burdmen';
				input.dispatchEvent(new Event('keyup'));

				await waitFor(2);
				expect(fetchSpy).toHaveBeenCalledWith(url, {"content-type": "application/json", "headers": headers, "method": "POST", "body": JSON.stringify(bodyTemplate('burdmen'))});

			});
			test('Or use provided data', async () => {
				let newArgs = Object.assign({
					endpoint: null,
					staticResultsData: [{"name":"Jason","type":"Honey-Beaked Salmon Hunter","id":"1234"},{"name":"Morpor","type":"Shoelace Heron","id":"34566"}]
				}, args);
				let auto = autoComplete(newArgs);
				auto.enable();

				input.value = 'IntrepidTrouser';
				input.dispatchEvent(new Event('keyup'));

				await waitFor(2);
				expect(fetchSpy).not.toHaveBeenCalled();
				expect(mockResultsCallback.mock.calls.length).toBe(1);
			});

			test('Should invoke callback function from config', async () => {
				let auto = autoComplete(args);
				auto.enable();
				input.value = 'Pain Hawk';
				input.dispatchEvent(new Event('keyup'));

				await waitFor(2);
				expect(mockResultsCallback.mock.calls.length).toBe(1);
				expect(mockResultsCallback).toHaveBeenCalledWith(expectedResults);
			});
		});

		describe('A bad response', () => {
			test('Should call the error function provided in the config', async () => {
				let auto = autoComplete(args);
				auto.enable();

				setMockFetch({ok: false, status: 404 });
				input.value = 'Death Kestrel';
				input.dispatchEvent(new Event('keyup'));

				await waitFor(2);
				expect(mockErrorCallback.mock.calls.length).toBe(1);
			});
		});

		describe('A response with zero suggestions', () => {
			test('Should not error out because the "no results" situation is the job of the resultsCallBack', async () => {
				let auto = autoComplete(args);
				auto.enable();

				setMockFetch({ok: true, status: 200, json: () => { return []; }});
				input.value = 'bur';
				input.dispatchEvent(new Event('keyup'));

				await waitFor(2);
				expect(mockResultsCallback).toHaveBeenCalledWith([]);
			});
		});
});
