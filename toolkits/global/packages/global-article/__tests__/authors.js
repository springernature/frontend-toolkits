import AuthorList from '../js/authors';

jest.mock('@springernature/global-popup/js/popup');

describe('Authors', () => {
	let authorList;
	let selector;

	function createAuthorListWithTruncate(options) {
		authorList = new AuthorList();

		const authors = document.querySelector('.c-author-list');
		authorList.create(authors, options);
	}

	function createCustomAuthorList({number = 2, separator = true, orcid = false} = {}) {
		if (!number) {
			return;
		}

		let list = document.createElement('ul');
		let listChildren = '';

		for (let i = 0; i < number; i++) {
			listChildren += `<li><a href="#author${i}">author${i}</a><sup><a href="#Aff${i}" tabindex="-1" data-author-popup="author${i}">1</a>
				${separator ? `,` : ''}
				${orcid ? `<span class="u-js-hide"><a href="#jxs" class="js-orcid"></a></span>` : ''}
			</li>`;
		}

		list.setAttribute('class', 'c-author-list js-no-scroll');
		list.innerHTML = listChildren;

		document.body.appendChild(list);

		selector = document.querySelector('.c-author-list');
	}

	afterEach(() => {
		authorList = null;
		selector = null;
		document.body.innerHTML = '';
	});

	describe('When initiated', () => {
		function addSupElement() {
			const sup = `<sup>
				<a href="#Aff1" tabIndex="0">1</a>
				<span>This is an affiliation</span>
			</sup>`;

			selector.querySelector('li').innerHTML += sup;
		}

		beforeEach(() => {
			document.body.innerHTML = `<ul class="c-author-list">
				<li>
					<a href="#author1">author 1</a>
				</li>
			</ul>`;
			selector = document.querySelector('.c-author-list');
			authorList = new AuthorList();
		});

		test('Should be able to create a new author list component', () => {
			expect(authorList.create).toBeDefined();
		});

		test('Should avoid jumping to the selected anchored section when js enabled', () => {
			authorList.create(selector);
			expect(selector.classList.contains('js-no-scroll')).toBeTruthy();
		});

		test('Should avoid the hidden affiliation links get keyboard focus', () => {
			addSupElement();

			authorList.create(selector);

			expect(selector.querySelector('sup a').getAttribute('tabIndex')).toBe('-1');
		});

		test('Should register click events for each author name', () => {
			selector.addEventListener = jest.fn();

			authorList.create(selector);

			expect(selector.addEventListener).toHaveBeenCalled();
			expect(selector.addEventListener.mock.calls[0]).toBe('click');
			jest.clearAllMocks();
		});
	});

	describe('When truncating', () => {
		let showLessHandler;
		let showMoreHandler;

		function insertArticleSubtitle() {
			let subtitle = document.createElement('div');
			subtitle.innerHTML = '<h3 itemprop="subtitle">subtitle</h3>';
			selector.parentNode.insertBefore(subtitle, selector);
			subtitle.appendChild(selector);
		}

		function initAuthorListToTruncate(length = { number: 10 }, truncate = {
			etalSmallscreen: 2,
			etal: 7
		}) {
			createCustomAuthorList(length);
			createAuthorListWithTruncate(truncate);

			showLessHandler = selector.querySelector('.c-author-list__show-less');
			showMoreHandler = selector.querySelector('.c-author-list__show-more');
		}

		test('Should collapse the list of authors when some limit exceeded', () => {
			initAuthorListToTruncate({ number: 18 }, {
				etalSmallscreen: 2,
				etal: 6
			});

			expect(document.querySelector('.js-etal-collapsed')).not.toBeNull();
			expect(document.querySelector('.js-authors-expanded')).toBeNull();
		});

		test('Should not collapse the list of authors when no limit exceeded', () => {
			initAuthorListToTruncate({ number: 3 }, {
				etalSmallscreen: 3,
				etal: 6
			});

			expect(document.querySelector('.js-etal-collapsed')).toBeNull();
			expect(document.querySelector('.js-authors-expanded')).toBeNull();
		});

		test('Should hide the left out over authors from the list if the length is higher than full screen limit', () => {
			initAuthorListToTruncate({ number: 18 }, {
				etalSmallscreen: 2,
				etal: 6
			});

			expect(document.querySelectorAll('.js-author-etal').length).toBe(15);
		});

		test('Should hide the left out over authors from the list if the length is higher than small screen limit', () => {
			initAuthorListToTruncate({ number: 8 });

			expect(document.querySelectorAll('.js-smaller-author-etal').length).toBe(5);
		});

		test('Should generate truncating and expanding handlers if the authors list length exceeds the full screen or small screen limits', () => {
			initAuthorListToTruncate({ number: 8 }, {
				etalSmallscreen: 2,
				etal: 10
			});

			expect(showLessHandler).not.toBeNull();
			expect(showMoreHandler).not.toBeNull();
		});

		test('Should not generate truncating and expanding handlers if the authors list length do not exceeds the full screen nor small screen limits', () => {
			initAuthorListToTruncate({ number: 1 }, {
				etalSmallscreen: 2,
				etal: 10
			});
			expect(showLessHandler).toBeNull();
			expect(showMoreHandler).toBeNull();
		});

		test('Should recognise if the authors list length exceeds the small screen limit but not the full screen one', () => {
			initAuthorListToTruncate({ number: 3 }, {
				etalSmallscreen: 2,
				etal: 7
			});

			expect(showMoreHandler.classList.contains('js-mq480-show-inline')).toBeTruthy();
		});

		test('Should hide the author separator after the show more handler when authors list length exceeds both the small screen limit and the full screen one', () => {
			initAuthorListToTruncate({ number: 10 }, {
				etalSmallscreen: 2,
				etal: 8
			});

			expect(showLessHandler).not.toBeNull();
			expect(selector.classList.contains('js-etal-collapsed')).toBeTruthy();
		});

		test('Should have truncate and expand handlers with default article subtitle', () => {
			initAuthorListToTruncate({ number: 10 }, {
				etalSmallscreen: 1,
				etal: 5
			});

			expect(showLessHandler.querySelector('a').getAttribute('aria-label').indexOf('this article') !== -1).toBeTruthy();
			expect(showMoreHandler.querySelector('a').getAttribute('aria-label').indexOf('this article') !== -1).toBeTruthy();
		});

		test('Should have truncate and expand handlers with a given article subtitle', () => {
			createCustomAuthorList();
			insertArticleSubtitle();

			createAuthorListWithTruncate({
				etalSmallscreen: 1,
				etal: 5
			});

			showLessHandler = selector.querySelector('.c-author-list__show-less');
			showMoreHandler = selector.querySelector('.c-author-list__show-more');

			expect(showLessHandler.querySelector('a').getAttribute('aria-label').indexOf('subtitle') !== -1).toBeTruthy();
			expect(showMoreHandler.querySelector('a').getAttribute('aria-label').indexOf('subtitle') !== -1).toBeTruthy();
		});
	});

	describe('When clicking on the handler to expand', () => {
		let showLessHandler;
		let showMoreHandler;

		function initAuthorListAndClickToExpand(length = { number: 10 }) {
			createCustomAuthorList(length);
			createAuthorListWithTruncate({
				etalSmallscreen: 2,
				etal: 7
			});

			showLessHandler = selector.querySelector('.c-author-list__show-less');
			showMoreHandler = selector.querySelector('.c-author-list__show-more');

			document.querySelector('.c-author-list__show-more a').click();
		}

		test('Should expand the author list', () => {
			initAuthorListAndClickToExpand();

			expect(document.querySelector('.js-authors-expanded')).not.toBeNull();
			expect(document.querySelector('.js-etal-collapsed')).toBeNull();
		});

		test('Should show the hidden left out over authors when the authors list length exceeds the full screen ', () => {
			initAuthorListAndClickToExpand();

			expect(showMoreHandler.classList.contains('u-js-hide')).toBeTruthy();
			expect(showLessHandler.classList.contains('u-js-hide')).toBeFalsy();
		});

		test('Should show the hidden left out over authors when the authors list length exceeds the small screen ', () => {
			initAuthorListAndClickToExpand({ number: 6 });

			expect(showMoreHandler.classList.contains('js-mq480-show-inline')).toBeFalsy();
			expect(showLessHandler.classList.contains('js-mq480-show-inline')).toBeTruthy();
		});
	});

	describe('When clicking on the handler to collapse', () => {
		let showLessHandler;
		let showMoreHandler;

		function initAuthorListAndClickToCollapse(length = { number: 10 }) {
			createCustomAuthorList(length);
			createAuthorListWithTruncate({
				etalSmallscreen: 2,
				etal: 7
			});

			showLessHandler = selector.querySelector('.c-author-list__show-less');
			showMoreHandler = selector.querySelector('.c-author-list__show-more');

			document.querySelector('.c-author-list__show-more a').click();
			document.querySelector('.c-author-list__show-less a').click();
		}

		test('Should collapse the author list', () => {
			initAuthorListAndClickToCollapse();

			expect(document.querySelector('.js-authors-expanded')).toBeNull();
			expect(document.querySelector('.js-etal-collapsed')).not.toBeNull();
		});

		test('Should hide the authors list partially when length exceeds the full screen', () => {
			initAuthorListAndClickToCollapse();

			expect(showMoreHandler.classList.contains('u-js-hide')).not.toBeTruthy();
			expect(showLessHandler.classList.contains('u-js-hide')).toBeTruthy();
		});

		test('Should hide the authors list partially when length exceeds the small screen', () => {
			initAuthorListAndClickToCollapse({ number: 3 });

			expect(showMoreHandler.classList.contains('js-mq480-show-inline')).toBeTruthy();
			expect(showLessHandler.classList.contains('js-mq480-show-inline')).toBeFalsy();
		});
	});

	describe('When existing popup', () => {
		function initAuthorList(length = { number: 10 }) {
			createCustomAuthorList(length);
			createAuthorListWithTruncate({
				etalSmallscreen: 2,
				etal: 7
			});
		}

		function setUpDOM() {
			document.body.innerHTML += `<ul>
				<li id="author0">
					<span class="c-article-authors-search__title u-h3 js-search-name">Eliza S. Nieweglowska</span>
					<div class="c-article-authors-search__list">content</div>
				</li>
			</ul>
			<ul>
				<li id="Aff0">
					<span class="c-article-author-affiliation__address">Department of Microbiology and Immunology, University of California San Francisco, San Francisco, CA, USA</span>
					<ul>
						<li>Senén D. Mendoza</li>
						<li>,&nbsp;Sutharsan Govindarajan</li>
					</ul>
				</li>
			<ul>`;
		}

		beforeEach(() => {
			setUpDOM();
		});

		afterEach(() => {
			jest.clearAllMocks();
			document.body.innerHTML = '';
		});

		test('Should be setup a correct container', () => {
			initAuthorList();

			document.querySelector('.c-author-list li:first-child a').click();

			const popup = document.querySelector('.c-author-popup');

			expect(popup.getAttribute('id')).toBe('popup-author0');
			expect(popup.getAttribute('role')).toBe('region');
			expect(popup.getAttribute('class')).toContain('c-author-popup');
			expect(popup.getAttribute('aria-labelledby')).toBe('author0');
		});

		test('Should have a heading defined', () => {
			initAuthorList();

			document.querySelector('.c-author-list li:first-child a').click();

			const popup = document.querySelector('.c-author-popup');
			const subheading = popup.querySelector('h3');

			expect(subheading.getAttribute('tabindex')).toBeDefined();
			expect(subheading.getAttribute('id')).toBeDefined();
			expect(subheading.classList.contains('c-author-popup__subheading')).toBeTruthy();
		});

		test('Should have footer', () => {
			initAuthorList();

			document.querySelector('.c-author-list li:first-child a').click();

			const popup = document.querySelector('.c-author-popup');

			expect(popup.querySelector('.c-article-authors-search__list')).not.toBeNull();
			expect(popup.querySelector('.js-search-name')).toBeNull();
		});

		test('Should have the list of affiliations and its related information', () => {
			initAuthorList();

			document.querySelector('.c-author-list li:first-child a').click();

			const popup = document.querySelector('.c-author-popup');

			const affiliations = popup.querySelector('.c-author-popup__author-list');
			const afffiliationAddress = document.querySelector('.c-article-author-affiliation__address').textContent;

			expect(affiliations).not.toBeNull();

			expect(affiliations.querySelector('li:first-child').textContent).toBe(afffiliationAddress);

		});

		test('Should have orcid link', () => {
			initAuthorList({ number: 10, orcid: true });

			document.querySelector('.c-author-list li:first-child a').click();

			const popup = document.querySelector('.c-author-popup');

			const orcid = popup.querySelector('.c-article-orcid');

			expect(orcid).not.toBeNull();
			expect(orcid.getAttribute('rel')).toBe('noopener');
			expect(orcid.getAttribute('title')).toBeDefined();
			expect(orcid.getAttribute('title')).toBeDefined();
		});
	});
});
