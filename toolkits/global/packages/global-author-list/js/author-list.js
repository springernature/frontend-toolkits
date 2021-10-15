/**
 * Truncates an author list and enhances it with a toggle button.
 *
 * @param {object} container Author list container element.
 * @param {object} [config] Config necessary to setup the component.
 * @param {string} [config.headingSelector=[data-author-list-heading]] Selector to the author list's heading element.
 * @param {string} [config.listSelector=ul] Selector to the author list's list element.
 * @param {string} [config.authorHideClass=c-author-list__hide] CSS class to hide items from the author list's list when it is truncated.
 * @param {string} [config.truncatedClass=c-author-list--truncated] CSS class to toggle onto the list element when it is truncated.
 * @param {string} [config.listModifierClass] CSS class to add to the list the component is initialised.
 * @param {string} [config.buttonClassList] List of CSS classes to style the toggle button.
 */
function authorList(container, config = {}) {
	let {
		headingSelector,
		listSelector,
		authorHideClass,
		truncatedClass,
		listModifierClass,
		buttonClassList
	} = config;
	let button;
	let list;
	let heading;
	let listItems;

	headingSelector = headingSelector || '[data-author-list-heading]';
	listSelector = listSelector || 'ul';
	authorHideClass = authorHideClass || 'c-author-list__hide';
	truncatedClass = truncatedClass || 'c-author-list--truncated';

	return {
		init
	};

	function init() {
		if (!container) {
			return;
		}

		heading = container.querySelector(headingSelector);
		list = container.querySelector(listSelector);

		if (!heading || !list) {
			return;
		}

		listItems = list.children;
		const truncateLimit = container.dataset.authorListTruncateLimit || 5;

		if (truncateLimit < listItems.length) {
			addButton();
			if (listModifierClass) {
				list.classList.add(listModifierClass);
			}
			toggleState();

			button.addEventListener('click', function (event) {
				event.preventDefault();
				toggleState();
			});

			button.addEventListener('keydown', function (event) {
				if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
					event.preventDefault();
					toggleState();
				}
			});
		}
	}

	function toggleState() {
		toggleButton();
		toggleHeadingText();
		toggleAuthorsDisplay();
	}

	function toggleAuthorsDisplay() {
		for (let index = 2; index < listItems.length - 1; ++index) {
			listItems[index].classList.toggle(authorHideClass);
		}
		list.classList.toggle(truncatedClass);
	}

	// eslint-disable-next-line unicorn/consistent-function-scoping
	function toggleHeadingText() {
		const collapsedText = `Authors (first, second and last of ${listItems.length})`;
		const expandedText = 'Authors';

		const currentText = heading.textContent;
		heading.textContent = (currentText === collapsedText) ? expandedText : collapsedText;
	}

	// eslint-disable-next-line unicorn/consistent-function-scoping
	function toggleButton() {
		const collapsedText = 'Show all authors';
		const expandedText = 'Show less authors';
		const currentText = button.textContent;
		const collapsedIcon = `<svg width="14" height="14" aria-hidden="true" focusable="false"><use href="#icon-plus"></use></svg>`;
		const expandedIcon = `<svg width="14" height="14" aria-hidden="true" focusable="false"><use href="#icon-minus"></use></svg>`;
		const expanded = button.getAttribute('aria-expanded') === 'true' || false;

		button.innerHTML = (currentText === collapsedText) ? expandedIcon + expandedText : collapsedIcon + collapsedText;

		button.setAttribute('aria-expanded', !expanded);
	}

	function addButton() {
		button = document.createElement('button');
		const buttonIcon = '<svg width="14" height="14" aria-hidden="true" focusable="false"><use href="#icon-minus"></use></svg>';
		const buttonText = 'Show less authors';
		const listId = list.id;

		button.setAttribute('aria-expanded', true);

		if (listId) {
			button.setAttribute('aria-controls', listId);
		}
		if (buttonClassList) {
			button.className = buttonClassList;
		}
		button.innerHTML = buttonIcon + buttonText;

		list.insertAdjacentElement('afterend', button);
	}
}

export {
	authorList
};
