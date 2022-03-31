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
		resultsCallBack,
		selectOnSuggestionBrowsing = true,
		selectOnTab = false
	} = arguments_;

	if (!selector || !resultsCallBack || !resultSelector || !resultsContainerSelector || (!endpoint && !staticResultsData)) {
		console.error('Please provide selector, resultsCallBack, and endpoint or staticResultsData');
		return;
	}

	const input = document.querySelector(selector);
	const getContainer = () => {
		return document.querySelector(`${resultsContainerSelector}`);
	};
	const suggestions = () => {
		return Array.from(document.querySelectorAll(`${resultSelector}`));
	};

	const eventKeys = ['ArrowDown', 'Down', 'ArrowUp', 'Up', 'Escape', 'Esc', 'Enter', 'Tab'];

	let inputTimer = null;
	let fetchTimer = null;
	let currentSearchTerm;

	// Keyboard Event Listeners for text input
	const inputEvents = event => {
		if (/ArrowDown|Down/.test(event.key)) {
			event.preventDefault();
			if (suggestions().length > 0) {
				suggestions()[0].focus();
				if (selectOnSuggestionBrowsing) {
					input.value = suggestions()[0].textContent;
				}
			}
		}
	};

	const removeSuggestions = event => {
		if (event && event.target.matches(`[data-component=${componentName}]`)) {
			return;
		}
		input.removeEventListener('keyup', inputEvents);
		const resultsContainer = getContainer();
		if (resultsContainer) {
			resultsContainer.remove();
		}
		document.removeEventListener('click', removeSuggestions);
		input.setAttribute('aria-expanded', false);
	};

	const addSuggestionEventListeners = () => {
		const resultsContainer = getContainer();
		if (resultsContainer === null) {
			return;
		}

		resultsContainer.addEventListener('keydown', event => {
			if (['Escape', 'Esc', 'ArrowUp', 'Up', 'ArrowDown', 'Down'].includes(event.key)) {
				event.preventDefault();
				event.stopPropagation();
			}

			let activeElement = document.activeElement;
			let nextSibling = activeElement.nextSibling;
			let previousSibling = activeElement.previousSibling;
			let currentIndex = Array.from(activeElement.parentNode.children).indexOf(activeElement);

			if (/ArrowDown|Down/.test(event.key)) {
				if (nextSibling) {
					if (selectOnSuggestionBrowsing) {
						if ((currentIndex + 1) < suggestions().length) {
							input.value = nextSibling.textContent;
						} else {
							input.value = currentSearchTerm;
						}
					}
					nextSibling.focus();
				}
			} else if (/ArrowUp|Up/.test(event.key)) {
				if (previousSibling) {
					if (selectOnSuggestionBrowsing) {
						input.value = previousSibling.textContent;
					}
					previousSibling.focus();
				} else {
					input.focus();
					if (selectOnSuggestionBrowsing) {
						input.value = currentSearchTerm;
					}
				}
			} else if (event.key === 'Escape' || event.key === 'Esc') {
				removeSuggestions();
				input.value = currentSearchTerm;
				input.focus();
			}
		});

		suggestions().forEach(element => {
			element.addEventListener('click', () => {
				if (onSelect) {
					onSelect(element.textContent);
				}
				removeSuggestions();
				input.focus();
			});
			element.addEventListener('keyup', event => {
				if (event.key === 'Enter') {
					if (onSelect) {
						onSelect(element.textContent);
					}
					removeSuggestions();
					input.focus();
				}
			});
			if (selectOnTab) {
				element.addEventListener('keydown', event => {
					if (event.key === 'Tab') {
						if (onSelect) {
							onSelect(element.textContent);
						}
						removeSuggestions();
						input.focus();
					}
				});
			}
		});
	};

	const generateSuggestions = data => {
		removeSuggestions();
		document.addEventListener('click', removeSuggestions);
		input.addEventListener('keyup', inputEvents);
		resultsCallBack.call(this, data);
		addSuggestionEventListeners();
		const container = getContainer();
		if (container) {
			container.addEventListener('keydown', ev => {
				if (ev.key === 'Tab') {
					removeSuggestions();
				}
			});
		}

		input.setAttribute('aria-expanded', true);
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

		if (event.key === 'Escape' || event.key === 'Esc') {
			removeSuggestions(event);
		}
		if (event.key === 'Enter') {
			event.preventDefault();
		}
	};

	input.addEventListener('keydown', ev => {
		if (ev.key === 'Tab') {
			removeSuggestions();
		}
	});

	const enable = () => {
		if (input) {
			input.addEventListener('keyup', listenForInput);
			input.setAttribute('aria-expanded', 'false');
		}
	};

	const disable = () => {
		removeSuggestions();
		input.removeEventListener('keyup', listenForInput);
		input.removeAttribute('aria-expanded');
	};

	return {
		enable: enable,
		disable: disable
	};
};

export default autoComplete;
