/* eslint-disable unicorn/prefer-text-content */
const {authorList} = require('../author-list');

const fixture = `
	<div data-author-list data-author-list-truncate-limit="3">
		<h3 data-author-list-heading>Authors</h3>
		<ul id="author-list-id">
			<li>Author 1</li>
			<li>Author 2</li>
			<li>Author 3</li>
			<li>Author 4</li>
		</ul>
	</div>
	<a href="/somewhere">Link</a>
`;

describe('Author List', () => {
	let authorListContainer;

	beforeEach(() => {
		document.body.innerHTML = fixture;
		authorListContainer = document.querySelector('[data-author-list]');
	});

	it('does not error if can\'t match data-author-list', () => {
		expect(() => {
			authorList().init();
		}).not.toThrow();
	});

	it('does not error if no configuration is given', () => {
		expect(() => {
			authorList(authorListContainer);
		}).not.toThrow();
	});

	it('does not error if the config heading does not match any html element', () => {
		expect(() => {
			authorList(authorListContainer, {
				headingSelector: 'nonsense'
			}).init();
		}).not.toThrow();
	});

	it('does not error if the config list does not match any html element', () => {
		expect(() => {
			authorList(authorListContainer, {
				listSelector: 'nonsense'
			}).init();
		}).not.toThrow();
	});

	// eslint-disable-next-line jest/expect-expect
	it('fallbacks to truncate limit 5 when the relevant data attribute is absent', () => {
		const authorListElement = authorListContainer.querySelector('ul');

		authorListContainer.removeAttribute('data-author-list-truncate-limit');
		authorList(authorListContainer).init();

		isNotInitialised(authorListContainer);

		authorListElement.append(document.createElement('li'));
		authorListElement.append(document.createElement('li'));

		authorList(authorListContainer).init();
		isTruncated(authorListContainer);
	});

	// eslint-disable-next-line jest/expect-expect
	it('does init to truncated state: truncated list, show all authors, and verbose heading', () => {
		authorList(authorListContainer).init();

		isTruncated(authorListContainer);
	});

	// eslint-disable-next-line jest/expect-expect
	it('does NOT do any truncation operation if the limit is greater than the length of the list', () => {
		authorListContainer.dataset.authorListTruncateLimit = 10;

		authorList(authorListContainer).init();

		isNotInitialised(authorListContainer);
	});

	// eslint-disable-next-line jest/expect-expect
	it('does, once initialised, expand on click and truncates on second click', () => {
		authorList(authorListContainer).init();

		const toggleAuthorListButton = authorListContainer.querySelector('button');
		toggleAuthorListButton.click();

		isExpanded(authorListContainer);

		toggleAuthorListButton.click();

		isTruncated(authorListContainer);
	});

	['Enter', 'Space', 'Spacebar'].forEach(key => {
		// eslint-disable-next-line jest/expect-expect
		it(`does, once initialised, expand on onKeydown ${key} on the toggle button and truncates on second onKeydown ${key}`, () => {
			authorList(authorListContainer).init();

			const toggleAuthorListButton = authorListContainer.querySelector('button');
			const keydownEvent = createKeydownEvent(key);
			toggleAuthorListButton.dispatchEvent(keydownEvent);

			isExpanded(authorListContainer);

			toggleAuthorListButton.dispatchEvent(keydownEvent);

			isTruncated(authorListContainer);
		});
	});

	it('applies the listModifierClass to the list element', () => {
		authorList(authorListContainer, {
			listModifierClass: 'whatever'
		}).init();

		const authorListElement = authorListContainer.querySelector('ul');

		expect(authorListElement.classList).toContain('whatever');
	});

	it('does not apply any listModifierClass to the list element if not provided', () => {
		authorList(authorListContainer).init();

		const authorListElement = authorListContainer.querySelector('ul');

		expect(authorListElement.className).toBe('c-author-list--truncated');
	});

	it('applies the buttonClassList to the list element', () => {
		const buttonClassList = 'free to be whatever';
		authorList(authorListContainer, {
			buttonClassList
		}).init();

		const button = authorListContainer.querySelector('button');

		expect(button.className).toEqual(buttonClassList);
	});

	it('does not apply any buttonClassList if not provided', () => {
		const buttonClassList = 'free to be whatever';
		authorList(authorListContainer, {
			buttonClassList
		}).init();

		const button = authorListContainer.querySelector('button');

		expect(button.className).toEqual(buttonClassList);
	});

	it('does not apply any buttonIcon if the config hasButtonIcon is false', () => {
		authorList(authorListContainer, {
			hasButtonIcon: false
		}).init();

		const button = authorListContainer.querySelector('button');
		const icon = button.querySelector('svg');

		expect(icon).toBe(null);
	});

	it('adds an aria-controls attribute to the button if the list has an id', () => {
		authorList(authorListContainer).init();

		const authorListElement = authorListContainer.querySelector('ul');
		const button = authorListContainer.querySelector('button');

		expect(button.getAttribute('aria-controls')).toBe(authorListElement.id);
	});

	it('does NOT add an aria-controls attribute to the button if the list does NOT have an id', () => {
		const authorListElement = authorListContainer.querySelector('ul');

		authorListElement.removeAttribute('id');
		authorList(authorListContainer).init();

		const button = authorListContainer.querySelector('button');

		expect(button.getAttribute('aria-controls')).toBe(null);
	});

	it('once focused on the button, it can be tabbed away', () => {
		authorList(authorListContainer).init();

		const button = authorListContainer.querySelector('button');
		let keydownTabEvent = createKeydownEvent('Tab');
		button.focus();

		expect(document.activeElement).toBe(button);

		// button.insertAdjacentHTML('afterend', '<a href="/somewhere">Link</a>');

		const nextInteractiveElement = document.querySelector('a');
		button.dispatchEvent(keydownTabEvent);

		// When an element looses focus, the next element to acquire it
		// actually gets it on the next tick of the event loop. Calling
		// setTimeout(cb, 0) will execute its callback at the end of the next
		// tick, when the next element will have acquired the focus.
		setTimeout(() => {
			expect(document.activeElement).toBe(nextInteractiveElement);
		}, 0);
	});
});

function isNotInitialised(authorListContainer) {
	const heading = authorListContainer.querySelector('h3');
	const list = authorListContainer.querySelector('ul');
	const listHiddenItems = list.querySelectorAll('li.c-author-list__hide');

	expect(heading.textContent).toBe('Authors');
	expect(listHiddenItems.length).toBe(0);
	expect(authorListContainer.querySelector('button')).toBe(null);
}

function isTruncated(authorListContainer) {
	const heading = authorListContainer.querySelector('h3');
	const list = authorListContainer.querySelector('ul');
	const listItems = list.children;
	const button = authorListContainer.querySelector('button');
	const icon = button.querySelector('svg');

	expect(heading.textContent).toBe(`Authors (first, second and last of ${listItems.length})`);
	expect(button.textContent).toContain('Show all authors');
	expect(button.getAttribute('aria-expanded')).toBe('false');
	expect(icon.innerHTML).toContain('#icon-plus');

	[...listItems].forEach((item, index) => {
		switch (index) {
			// First, second and last should be visible.
			case 0:
			case 1:
			case listItems.length - 1:
				expect(item.className).not.toContain('c-author-list__hide');
				break;
			default:
				expect(item.className).toContain('c-author-list__hide');
				break;
		}
	});
}

function isExpanded(authorListContainer) {
	const heading = authorListContainer.querySelector('h3');
	const list = authorListContainer.querySelector('ul');
	const listItems = list.children;
	const button = authorListContainer.querySelector('button');
	const icon = button.querySelector('svg');

	expect(heading.textContent).toBe('Authors');
	expect(button.textContent).toContain('Show fewer authors');
	expect(button.getAttribute('aria-expanded')).toBe('true');
	expect(icon.innerHTML).toContain('#icon-minus');

	[...listItems].forEach(item => {
		expect(item.classList).not.toContain('c-author-list__hide');
	});
}

function createKeydownEvent(key) {
	const event = new Event('keydown', {
		bubbles: true
	});

	switch (key) {
		case 'Enter':
			event.key = 'Enter';
			break;
		case 'Space':
			event.key = ' ';
			break;
		case 'Spacebar':
			event.key = 'Spacebar';
			break;
		case 'Tab':
			event.key = 'Tab';
			event.shiftKey = false;
			break;
		default:
			throw new Error('key should be "Enter", " " (Space), "Spacebar", "Tab"');
	}

	return event;
}

