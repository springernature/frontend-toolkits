const ReadingCompanion = require('../js/reading-companion');
const EventEmitter = require('../js/event-emitter');

const scheduler = {
	on: jest.fn().mockImplementation((event, callback) => {
		callback();
	}),
	off: jest.fn()
};

describe('Reading Companion', () => {
	let readingCompanion = null;
	let emitter = null;
	let readingCompanionContainer = null;

	function initReadingCompanion(config = {}) {
		emitter = new EventEmitter();
		readingCompanion = ReadingCompanion();
		readingCompanion.init(config, scheduler, emitter);
	}

	function includeMockFigures() {
		// figure in the content
		const figureHTML = `<section>
			<div class="c-article-section__figure js-c-reading-companion-figures-item">
				<figure>
					<figcaption>
						<b id="Fig2" class="c-article-section__figure-caption">Fig 2</b>
					</figcaption>
					<div>
						<div class="c-article-section__figure-item">
							<a class="c-article-section__figure-link" href="/fig2">
								<picture>
									<source type="image/webp" srcset="//media.springernature.com/41586_2020_2068_Fig2_HTML.png">
									<img src="//media.springernature.com/41586_2020_2068_Fig2_HTML.png" alt="figure2">
								</picture>
							</a>
						</div>
					</div>
					<a class="c-article__pill-button" href="/articles/s41586-020-2068-4/figures/1">Full size image</a>
			</div>
		</section>`;

		document.querySelector('section').insertAdjacentHTML('afterend', figureHTML);
	}

	function includeMockReferences() {
		const referencesHTML = `<section>
			<div class="c-article-section__references">
				<ol class="c-article-references">
					<li class="c-article-references__item js-c-reading-companion-references-item">
						<span class="c-article-references__counter">1.</span>
						<a href="#ref-CR1" class="c-article-references__text" id="ref-CR1">Link</a>
						<ul class="c-article-references__links u-hide-print">
							<li><a href="http://link">ADS</a></li>
							<li><a href="http://link">PubMed</a></li>
							<li><a href="http://link">Google Scholar</a></li>
						</ul>
					</li>
				</ol>
			</div>
		</section>`;

		document.querySelector('section').insertAdjacentHTML('afterend', referencesHTML);
	}

	function includeExtendedFiguresWithSupplementary() {
		const supplementaryHTML = `<div class="c-article-supplementary__item js-c-reading-companion-figures-item" id="Fig4">
			<h3 class="c-article-supplementary__title u-h3">
				<a href="/articles/s41586-020-2087-1/figures/4" data-supp-info-image="41586_2020_2087_Fig4_ESM.jpg">Extended Data Fig. 1</a>
			</h3>
		</div>`;

		document.querySelector('section').insertAdjacentHTML('afterend', supplementaryHTML);
	}

	function mockWindow() {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation(query => ({
			  matches: false,
			  media: query,
			  onchange: null,
			  addListener: jest.fn(),
			  removeListener: jest.fn(),
			  addEventListener: jest.fn(),
			  removeEventListener: jest.fn(),
			  dispatchEvent: jest.fn(),
			})),
		  });
	}

	function overrideHeadingToNotAllowCharacters() {
		document.querySelector('.c-article-section__title').textContent = '%Ab_s!tract';
	}

	function addBackgroundSection() {
		const backgroundSection = `<section>
			<div class="c-article-section" id="Sec1-section">
				<h2 class="c-article-section__title u-h2 js-section-title js-c-reading-companion-sections-item" id="Sec1" tabindex="-1">Background</h2>
				<div class="c-article-section__content" id="Sec1-content">
					<p>This is the content.</p>
				</div>
			</div>
		</section>`;

		document.querySelector('[data-component="article-container"] section').insertAdjacentHTML('afterend', backgroundSection);
	}

	function addFigLinkSection() {
		const figLinkSection = `<section>
			<h2 class="js-section-title" id="method">Method</h2>
			<p>Method <a href="#Fig2" id="fig-link2">2</a></p>
		</section>`;

		document.querySelector('[data-component="article-container"] section').insertAdjacentHTML('afterend', figLinkSection);
	}

	beforeEach(() => {
		document.documentElement.innerHTML = `
			<head></head>
			<body>
				<div data-component="article-container">
					<section aria-labelledby="Abs1">
						<div class="c-article-section" id="Abs1-section">
							<h2 class="c-article-section__title u-h2 js-section-title js-c-reading-companion-sections-item" id="Abs1">Abstract</h2>
						</div>
					</section>

					<div class="c-reading-companion">
						<div class="c-reading-companion__sticky" data-component="reading-companion-sticky">
							<div class="c-reading-companion__panel c-reading-companion__sections c-reading-companion__panel--active" id="tabpanel-sections">
							</div>
							<div class="c-reading-companion__panel c-reading-companion__figures" id="tabpanel-figures">
							</div>
							<div class="c-reading-companion__panel c-reading-companion__references" id="tabpanel-references">
							</div>
						</div>
					</div>
				</div>
			</body>
		`;

		readingCompanionContainer = document.querySelector('.c-reading-companion');
	});


	beforeAll(() => {
		mockWindow();
	});

	afterEach(() => {
		readingCompanion = null;
		emitter = null;

		document.body.innerHTML = null;
	});

	test('Should be able to initiate the reading companion', () => {
		initReadingCompanion();
		expect(readingCompanion.init).toBeDefined();
	});
	
	test('Should set and define the content container for the sections tab', () => {
		initReadingCompanion();
		
		expect(readingCompanionContainer.querySelector('.c-reading-companion__scroll-pane')).toBeDefined();
		expect(readingCompanionContainer.querySelector('.c-reading-companion__sections').getAttribute('aria-labelledby')).toBeDefined();
		expect(readingCompanionContainer.querySelector('.c-reading-companion__sections').getAttribute('aria-labelledby')).toBe('tab-sections');
	});
	test('Should remove non text and numbers from the heading before adding the data-track-label', () => {
		overrideHeadingToNotAllowCharacters();
		initReadingCompanion();

		const firstSection = document.querySelector('.c-reading-companion__sections-list').firstElementChild;
		expect(firstSection.querySelector('a').getAttribute('data-track-label')).toBe('link:Abstract');
	});

	test('Should create only a heading Section when nor figures nor references', () => {
		initReadingCompanion();
		expect(document.querySelector('.c-reading-companion__heading')).toBeDefined();
		expect(document.querySelector('.c-reading-companion__tabs')).toBeNull();
	});

	test('Should create a set of tabs for each section when they exist', () => {
		includeMockFigures();
		includeMockReferences();
		initReadingCompanion();

		const tabs = readingCompanionContainer.querySelector('.c-reading-companion__tabs');
		expect(tabs).not.toBeNull();
		expect(tabs.children.length).toBe(3);
	});

	test('Should set sections as default active tab', () => {
		includeMockFigures();
		includeMockReferences();
		initReadingCompanion();

		const tabs = readingCompanionContainer.querySelector('.c-reading-companion__tabs');

		expect(tabs.querySelector('[data-tab-target="sections"]').getAttribute('aria-selected')).toBe('true');
	});

	test('Should create list of items which contains a anchor element to the existing abstract section', () => {
		initReadingCompanion();
		const sections = readingCompanionContainer.querySelector('.c-reading-companion__sections-list');

		expect(sections).not.toBeNull();
		expect(document.querySelector('.c-reading-companion__sections-list').firstElementChild.textContent).toBe('Abstract');
	});

	test('Should create list of items with existent figures', () => {
		includeMockFigures();
		initReadingCompanion();

		const figures = readingCompanionContainer.querySelector('.c-reading-companion__figures-list');

		expect(figures).not.toBeNull();
		expect(document.querySelector('.c-reading-companion__figures-list').children.length).toBe(1);
	});

	test('Should generate a figure element and its corresponding related info when figures exist', () => {
		includeMockFigures();
		initReadingCompanion();

		const figures = readingCompanionContainer.querySelector('.c-reading-companion__figures-list');
		expect(figures.firstElementChild.querySelector('figure')).not.toBeNull();
		expect(figures.firstElementChild.querySelector('figcaption')).not.toBeNull();
		expect(figures.firstElementChild.querySelector('picture')).not.toBeNull();
		expect(figures.firstElementChild.querySelector('.c-reading-companion__figure-links')).not.toBeNull();
	});

	test('Should add a supplementary info when available ', () => {
		includeExtendedFiguresWithSupplementary();
		initReadingCompanion();
		const figureTitle = document.querySelector('.c-reading-companion__figure-title');
		const figures = readingCompanionContainer.querySelector('.c-reading-companion__figures-list');

		expect(figureTitle.textContent.length > 0).toBeTruthy();
		expect(figureTitle.getAttribute('id')).not.toBeNull();
		expect(figures.firstElementChild.querySelector('a')).not.toBeNull();
		expect(figures.firstElementChild.querySelector('picture')).not.toBeNull();
		expect(figures.firstElementChild.querySelector('picture > img')).not.toBeNull();
	});

	test('Should add a link to the full width version in a supplementary info ', () => {
		includeExtendedFiguresWithSupplementary();
		initReadingCompanion({access: true});
		const figures = readingCompanionContainer.querySelector('.c-reading-companion__figures-list');

		expect(figures.firstElementChild.querySelector('.c-reading-companion__figure-full-link')).not.toBeNull();
	});

	test('Should generate a full size image link on the figure content when has access ', () => {
		includeMockFigures();
		initReadingCompanion({ access: true });

		const figures = readingCompanionContainer.querySelector('.c-reading-companion__figures-list');
		expect(figures.firstElementChild.querySelector('.c-reading-companion__figure-full-link')).not.toBeNull();
		expect(figures.firstElementChild.querySelector('.c-reading-companion__figure-full-link').textContent).toBe('Full size image');
	});

	test('Should create list of items with existent references and its corresponding related info when references exist', () => {
		includeMockReferences();
		initReadingCompanion();

		const references = readingCompanionContainer.querySelector('.c-reading-companion__references-list');

		expect(references).not.toBeNull();
		expect(references.children.length).toBe(1);
		expect(references.firstElementChild.querySelector('.c-reading-companion__reference-links')).not.toBeNull();
	});

	test('Should move the active tab to the last when keydown is 37', () => {
		includeMockReferences();
		includeMockFigures();
		initReadingCompanion();

		const tabs = document.querySelector('.c-reading-companion__tabs');
		const lastTab = tabs.querySelector('.c-reading-companion__tabs > li:last-child button');
		const event = new KeyboardEvent('keydown', {'keyCode': 37});

		tabs.dispatchEvent(event);

		expect(lastTab.getAttribute('aria-selected')).toBe('true');
		expect(lastTab.classList.contains('c-reading-companion__tab--active')).toBeTruthy();
	});

	test('Should move the active tab to the previous element sibling if there is an active element', () => {
		includeMockReferences();
		includeMockFigures();
		initReadingCompanion();		

		const tabs = document.querySelector('.c-reading-companion__tabs');
		const lastTab = tabs.querySelector('.c-reading-companion__tabs > li:last-child button');
		const event = new KeyboardEvent('keydown', {'keyCode': 37});

		tabs.dispatchEvent(event);

		expect(lastTab.getAttribute('aria-selected')).toBe('true');

		tabs.dispatchEvent(event);

		expect(tabs.querySelector('[data-tab-target="figures"]').getAttribute('aria-selected')).toBe('true');
	});
	
	test('Should move the active tab to the first when keydown is 39', () => {
		includeMockReferences();
		includeMockFigures();
		initReadingCompanion();

		const tabs = document.querySelector('.c-reading-companion__tabs');
		const firstTab = tabs.querySelector('.c-reading-companion__tabs > li:first-child button');
		const event = new KeyboardEvent('keydown', {'keyCode': 39});

		tabs.dispatchEvent(event);

		expect(firstTab.getAttribute('aria-selected')).toBe('true');
		expect(firstTab.classList.contains('c-reading-companion__tab--active')).toBeTruthy();
	});

	test('Should move the active tab to the next element sibling if there is an active element', () => {
		includeMockReferences();
		includeMockFigures();
		initReadingCompanion();		

		const tabs = document.querySelector('.c-reading-companion__tabs');
		const firstTab = tabs.querySelector('.c-reading-companion__tabs > li:first-child button');
		const event = new KeyboardEvent('keydown', {'keyCode': 39});

		tabs.dispatchEvent(event);

		expect(firstTab.getAttribute('aria-selected')).toBe('true');

		tabs.dispatchEvent(event);

		expect(tabs.querySelector('[data-tab-target="figures"]').getAttribute('aria-selected')).toBe('true');
	});

	test('Should move the active tab to the one is clicked on', () => {
		includeMockReferences();
		includeMockFigures();
		initReadingCompanion();

		const referencesTab = document.querySelector('[data-tab-target="references"]');

		referencesTab.click();
		expect(referencesTab.getAttribute('aria-selected')).toBe("true");
	});

	test('Should update the active section on a new selection', () => {
		addBackgroundSection();
		initReadingCompanion();
		emitter.emit('nav.section', 'Abs1', null);

		expect(document.querySelector('#rc-sec-Abs1').classList.contains('c-reading-companion__section-item--active')).toBeTruthy();
		
		emitter.emit('nav.section', 'Sec1', 'Abs1');

		expect(document.querySelector('#rc-sec-Abs1').classList.contains('c-reading-companion__section-item--active')).toBeFalsy();
		expect(document.querySelector('#rc-sec-Sec1').classList.contains('c-reading-companion__section-item--active')).toBeTruthy();
	});

	test('Should switch to figure tab and focus on the selected figure when clicking on a figure link', () => {
		includeMockFigures();
		addFigLinkSection();
		initReadingCompanion();

		const figureTab = document.querySelector('#tab-figures');
		const selectedFigure = document.querySelector('#rc-Fig2');

		selectedFigure.scrollIntoView = jest.fn();
		selectedFigure.addEventListener = jest.fn();
		emitter.emit('nav.figure', 'Fig2', null);

		expect(figureTab.getAttribute('aria-selected')).toBe('true');
		expect(figureTab.classList.contains('c-reading-companion__tab--active')).toBeTruthy();
		expect(selectedFigure.getAttribute('tabindex')).toBe('-1');
		expect(selectedFigure.classList.contains('c-reading-companion--highlighted')).toBeTruthy();
		expect(selectedFigure.addEventListener).toHaveBeenCalled();
		expect(selectedFigure.scrollIntoView).toHaveBeenCalledWith({block: 'start'});
	});

	test('Should switch to reference tab and focus on the selected reference when clicking on a reference link', () => {
		includeMockReferences();
		initReadingCompanion();

		const referencesTab = document.querySelector('#tab-references');
		const selectedReference = document.querySelector('#rc-ref-CR1');

		selectedReference.scrollIntoView = jest.fn();
		selectedReference.addEventListener = jest.fn();
		emitter.emit('nav.reference', 'ref-CR1', null);

		expect(referencesTab.getAttribute('aria-selected')).toBe('true');

	});
});