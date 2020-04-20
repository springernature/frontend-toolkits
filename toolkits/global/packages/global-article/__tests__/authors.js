import AuthorList from '../js/authors';
import $ from 'jquery';

describe('Authors', () => {
	let authorList;
	let selector;

	window.$ = $;
	
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
	
		afterEach(() => {
			authorList = null;
			selector = null;
			document.body.innerHTML = '';
		});

		test('Should be able to create a new author list component', () => {
			expect(authorList.create).toBeDefined();
		});
	
		test('Should avoid jumping to the selected anchored section when js enabled', () => {
			authorList.create($(selector));
			expect(selector.querySelector('a').classList.contains('js-no-scroll')).toBeTruthy();
		});	
	
		test('Should avoid the hidden affiliation links get keyboard focus', () => {
			addSupElement();
	
			authorList.create($(selector));
	
			expect(selector.querySelector('sup a').getAttribute('tabIndex')).toBe('-1');
		});
	
		test('Should register click events for each author name', () => {
			jest.spyOn($.fn, 'delegate');
	
			authorList.create($(selector));
	
			expect($('.c-author-list').delegate).toHaveBeenCalled();

			jest.clearAllMocks();
		});

		test.skip('Should toggle an existing popup to close or open when clicking on an author name', () => { 
			
		});
	});

	describe('When truncating', () => {
		function insertArticleSubtitle() {
			let subtitle = document.createElement('div');
			subtitle.innerHTML = '<h3 itemprop="subtitle">subtitle</h3>';
			selector.parentNode.insertBefore(subtitle, selector);
			subtitle.appendChild(selector);
		}

		function createAuthorListWithTruncate(options) {
			authorList = new AuthorList();

			authorList.create($(selector), null, options);
		}

		function createCustomAuthorList(number = 2, separator = true) {
			if (!number) {
				return;
			}

			if (separator) {
				
			}

			let list = document.createElement('ul');
			let listChildren = '';

			for (let i = 0; i < number; i++) {
				listChildren += `<li><a href="#author${i}">author${i}</a>
					${separator ? `<span class="js-separator">,</span>` : ''}
				</li>`;
			}

			list.setAttribute('class', 'c-author-list');
			list.innerHTML = listChildren;

			document.body.appendChild(list);

			selector = document.querySelector('.c-author-list');
		}

		afterEach(() => {
			authorList = null;
			selector = null;
			document.body.innerHTML = '';
		});

		test('Should collapse the list of authors when some limit exceeded', () => {
			createCustomAuthorList(18);
			createAuthorListWithTruncate({
				etalSmallscreen: 2,
				etal: 6
			});
			
			expect(document.querySelector('.js-etal-collapsed')).not.toBeNull();
			expect(document.querySelector('.js-authors-expanded')).toBeNull();
		});

		test('Should not collapse the list of authors when no limit exceeded', () => {
			createCustomAuthorList(3);
			createAuthorListWithTruncate({
				etalSmallscreen: 3,
				etal: 6
			});
			
			expect(document.querySelector('.js-etal-collapsed')).toBeNull();
			expect(document.querySelector('.js-authors-expanded')).toBeNull();
		});

		test('Should hide the left out over authors from the list if the lenght is higher than full screen limit', () => {
			createCustomAuthorList(18);
			createAuthorListWithTruncate({
				etalSmallscreen: 2,
				etal: 6
			});

			expect(document.querySelectorAll('.js-author-etal').length).toBe(15);
		});	

		test('Should hide the left out over authors from the list if the lenght is higher than small screen limit', () => {
			createCustomAuthorList(8);
			createAuthorListWithTruncate({
				etalSmallscreen: 2,
				etal: 7
			});

			expect(document.querySelectorAll('.js-smaller-author-etal').length).toBe(5);
		});	

		test('Should generate truncating and expanding handlers if the authors list lenght exceeds the full screen or small screen limits', () => {
			createCustomAuthorList(8);
			createAuthorListWithTruncate({
				etalSmallscreen: 2,
				etal: 10
			});

			const showLessHandler = selector.querySelector('.c-author-list__show-less');
			const showMoreHandler = selector.querySelector('.c-author-list__show-more');
			
			expect(showLessHandler).not.toBeNull();
			expect(showMoreHandler).not.toBeNull();
		});

		test('Should not generate truncating and expanding handlers if the authors list lenght do not exceeds the full screen nor small screen limits', () => {
			createCustomAuthorList(1);
			createAuthorListWithTruncate({
				etalSmallscreen: 2,
				etal: 10
			});

			const showLessHandler = selector.querySelector('.c-author-list__show-less');
			const showMoreHandler = selector.querySelector('.c-author-list__show-more');
			
			expect(showLessHandler).toBeNull();
			expect(showMoreHandler).toBeNull();
		});

		test('Should recognise if the authors list lenght exceeds the small screen limit but not the full screen one', () => {
			createCustomAuthorList(3);
			createAuthorListWithTruncate({
				etalSmallscreen: 2,
				etal: 7
			});

			const showMoreHandler = selector.querySelector('.c-author-list__show-more');

			expect(showMoreHandler.classList.contains('js-mq480-show-inline')).toBeTruthy();
		});

		test('Should hide the author separator after the show more handler when authors list lenght exceeds both the small screen limit and the full screen one', () => {
			createCustomAuthorList(10);
			createAuthorListWithTruncate({
				etalSmallscreen: 2,
				etal: 8
			});
			const showLessHandler = selector.querySelector('.c-author-list__show-less');
			const showMoreHandler = selector.querySelector('.c-author-list__show-more');
			
			expect(showMoreHandler.nextElementSibling.querySelector('.js-separator').classList.contains('u-js-hide')).toBeTruthy();
			expect(showLessHandler).not.toBeNull();			
			expect(selector.classList.contains('js-etal-collapsed')).toBeTruthy();
		});


		test('Should have truncate and expand handlers with default article subtitle', () => {
			createCustomAuthorList();
			createAuthorListWithTruncate({
				etalSmallscreen: 1,
				etal: 5
			});

			const showLessHandler = selector.querySelector('.c-author-list__show-less');
			const showMoreHandler = selector.querySelector('.c-author-list__show-more');

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
			const showLessHandler = selector.querySelector('.c-author-list__show-less');
			const showMoreHandler = selector.querySelector('.c-author-list__show-more');

			expect(showLessHandler.querySelector('a').getAttribute('aria-label').indexOf('subtitle') !== -1).toBeTruthy();
			expect(showMoreHandler.querySelector('a').getAttribute('aria-label').indexOf('subtitle') !== -1).toBeTruthy();
		});

		test('Should show the hidden left out over authors when clicking on the handler and the authors list lenght exceeds the full screen ', () => {
			createCustomAuthorList(10);
			createAuthorListWithTruncate({
				etalSmallscreen: 2,
				etal: 7
			});

			// const showLessHandler = selector.querySelector('.c-author-list__show-less a');
			// const showMoreHandler = selector.querySelector('.c-author-list__show-more a');

			$('.c-author-list__show-more a').click();
			
			// this should not be null as result of executing toggleAuthors
			expect(document.querySelector('.js-authors-expanded')).not.toBeNull();
			// expect(document.querySelector('.js-etal-collapsed')).toBeNull();
			// expect(showLessHandler.classList.contains('u-js-hide')).toBeTruthy();
			// expect(showMoreHandler.nextElementSibling.querySelector('.js-separator').classList.contains('u-js-hide')).toBeTruthy();
			// expect(showLessHandler.classList.contains('u-js-hide')).toBeFalsy();
		});
	
	});
	

	describe('When clicking on the expand / collapse link', () => {
		test('Should display full authors list when it is collapsed', () => {

		});
	
	
		test.skip('Should partially hide the authors list when it is uncollapsed', () => {
	
		});
	
		test.skip('Should close popup when collapsing the author list', () => {

		});

		
	});
	
});