const autoComplete = arguments_ => {
	const {
		selector,
		resultSelector,
		resultsContainerSelector,
		endpoint,
		staticResultsData,
		minChars = 0,
		componentName,
		onSelect,
		inputDelay = 300,
		requestTimeout = 2000,
		headers = {},
		httpMethod = 'GET',
		bodyTemplate,
		searchError,
		resultsCallBack
	} = arguments_;

	if (!selector || !resultsCallBack || !resultSelector || !resultsContainerSelector || (!endpoint && !staticResultsData)) {
		console.error('Please provide selector, resultsCallBack, and endpoint or staticResultsData');
		return;
	}

	const input = document.querySelector(selector);
	const container = () => {
		return document.querySelector(`${resultsContainerSelector}`);
	};
	const suggestions = () => {
		return Array.from(document.querySelectorAll(`${resultSelector}`));
	};

	const eventKeys = ['ArrowDown', 'ArrowUp', 'Escape', 'Enter', 'Tab'];

	let inputTimer = null;
	let fetchTimer = null;
	let currentSearchTerm;

	// Keyboard Event Listeners for text input
	const inputEvents = event => {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (suggestions().length > 0) {
				suggestions()[0].focus();
				input.value = suggestions()[0].textContent;
			}
		}
	};

	const removeSuggestions = event => {
		if (event && event.target.matches(`[data-component=${componentName}]`)) {
			return;
		}
		input.removeEventListener('keyup', inputEvents);
		if (container()) {
			container().remove();
		}
		document.removeEventListener('click', removeSuggestions);
		input.focus();
	};

	const addSuggestionEventListeners = () => {
		if (container() === null) {
			return;
		}

		container().addEventListener('keydown', event => {
			if (['Escape', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
				event.preventDefault();
				event.stopPropagation();
			}

			let activeElement = document.activeElement;
			let nextSibling = activeElement.nextSibling;
			let previousSibling = activeElement.previousSibling;
			let currentIndex = parseInt(activeElement.dataset.index, 10);

			switch (event.key) {
				case 'ArrowDown':
					if (nextSibling) {
						input.value = ((currentIndex + 1) < suggestions().length) ? nextSibling.textContent : currentSearchTerm;
						nextSibling.focus();
					}
					break;

				case 'ArrowUp':
					if (previousSibling) {
						input.value = previousSibling.textContent;
						previousSibling.focus();
					} else {
						input.focus();
						input.value = currentSearchTerm;
					}
					break;

				case 'Escape':
					removeSuggestions();
					input.value = currentSearchTerm;
					break;
				default:
					break;
			}
		});

		suggestions().forEach(element => {
			element.addEventListener('click', () => {
				if (onSelect) {
					onSelect(element.textContent);
				}
				removeSuggestions();
			});
			element.addEventListener('keyup', event => {
				if (event.key === 'Enter') {
					if (onSelect) {
						onSelect(element.textContent);
					}
					removeSuggestions();
				}
			});
		});
	};

	const generateSuggestions = data => {
		removeSuggestions();
		let resultsLength = data.length;
		if (resultsLength > 0) {
			input.addEventListener('keyup', inputEvents);
		} else {
			data.push('No results');
		}

		document.addEventListener('click', removeSuggestions);
		resultsCallBack.call(this, data);
		if (resultsLength > 0) {
			addSuggestionEventListeners();
		}
	};

	const handleData = term => {
		if (staticResultsData) {
			generateSuggestions(staticResultsData);
			return;
		}

		const fetchData = new Promise((resolve, reject) => {
			let fetchURL;
			const fetchParameters = {
				'content-type': 'application/json',
				headers,
				method: httpMethod
			};

			if (bodyTemplate) {
				fetchURL = endpoint;
				fetchParameters.body = JSON.stringify(bodyTemplate(term));
			} else {
				fetchURL = endpoint + term;
			}

			fetch(fetchURL, fetchParameters).then(response => {
				if (response.status === 200 && response.ok) {
					return response.json();
				}
			}).then(responseJson => {
				if (responseJson) {
					generateSuggestions(responseJson);
					resolve();
				} else {
					searchError();
				}
			}).catch(error => {
				reject(error);
			});
		});

		let fetchTimeout = new Promise((resolve, reject) => {
			fetchTimer = setTimeout(() => {
				clearTimeout(fetchTimer);
				reject(new Error('Timed out'));
			}, requestTimeout);
		});

		Promise.race([
			fetchData,
			fetchTimeout
		]).catch(error => {
			searchError(error);
		});
	};

	const listenForInput = event => {
		currentSearchTerm = input.value;
		if (!eventKeys.includes(event.key) && input.value.length >= minChars) {
			if (!inputTimer) {
				inputTimer = setTimeout(() => {
					window.clearTimeout(inputTimer);
					inputTimer = null;
					handleData(input.value);
				}, inputDelay);
			}
		}

		if (event.key === 'Escape') {
			removeSuggestions(event);
		}
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	};

	const enable = () => {
		if (input) {
			input.addEventListener('keyup', listenForInput);
		}
	};

	const disable = () => {
		removeSuggestions();
		input.removeEventListener('keyup', listenForInput);
	};

	return {
		enable: enable,
		disable: disable
	};
};

module.exports = autoComplete;
