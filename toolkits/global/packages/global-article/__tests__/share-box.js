const ShareBox = require('../js/share-box')();

const createMockHttpRequest = (responseJson = {}, status = 200) => {
	const mock = {
		open: jest.fn(),
		send: jest.fn(),
		addEventListener: jest.fn(),
		readyState: 4,
		DONE: 4,
		status: status,
		responseText: JSON.stringify(responseJson)
	};
	return mock;
};

const xmlHttp = window.XMLHttpRequest;

describe('Share Box', () => {
	let shareBoxElement = null;

	const clickShare = () => {
		shareBoxElement.querySelector('.js-get-share-url').dispatchEvent(new Event('click'));
	};

	const clickCopy = () => {
		shareBoxElement.querySelector('.js-copy-share-url').dispatchEvent(new Event('click'));
	};

	const loadXmlHttpRequest = (transport) => {
		transport.addEventListener.mock.calls[0][1]();
	};

	beforeEach(() => {
		document.body.innerHTML = `
			<div data-component="share-box"></div>
		`;
		shareBoxElement = document.querySelector('div[data-component="share-box"]');
	});

	it('Should not render anything if no share url is specified', () => {
		ShareBox.init();
		expect(shareBoxElement.innerHTML).toBe('');
	});

	it('Should allow a doi config property to be used for the share url', () => {
		ShareBox.init({doi: '10.1038/nature11111'});
		expect(shareBoxElement.querySelector('.c-article-share-box__title').textContent).toBe('Share this article');
		expect(shareBoxElement.querySelectorAll('.js-share-url').length).toBe(1);
		expect(shareBoxElement.querySelectorAll('.js-get-share-url').length).toBe(1);
		expect(shareBoxElement.querySelectorAll('.js-copy-share-url').length).toBe(1);
	});

	it('Should allow a url config property to be used for the share url', () => {
		ShareBox.init({url: '/share'});
		expect(shareBoxElement.querySelector('.c-article-share-box__title').textContent).toBe('Share this article');
		expect(shareBoxElement.querySelectorAll('.js-share-url').length).toBe(1);
		expect(shareBoxElement.querySelectorAll('.js-get-share-url').length).toBe(1);
		expect(shareBoxElement.querySelectorAll('.js-copy-share-url').length).toBe(1);
	});

	it('Should load the share url endpoint when the button is clicked', () => {
		const mockXmlHttp = createMockHttpRequest({url: '/share-url'});
		window.XMLHttpRequest = jest.fn(() => mockXmlHttp);

		ShareBox.init({url: '/share'});
		clickShare();

		expect(mockXmlHttp.open).toHaveBeenCalledWith('GET', '/share');
		window.XMLHttpRequest = xmlHttp;
	});

	it('Should join the url and doi if both are specified in the config', () => {
		const mockXmlHttp = createMockHttpRequest({url: '/share-url'});
		window.XMLHttpRequest = jest.fn(() => mockXmlHttp);

		ShareBox.init({url: '/share/', doi: '10.1038/nature11111'});
		clickShare();

		expect(mockXmlHttp.open).toHaveBeenCalledWith('GET', '/share/10.1038/nature11111');
		window.XMLHttpRequest = xmlHttp;
	});

	it('Should load the sharing url into the field', (done) => {
		const mockXmlHttp = createMockHttpRequest({url: '/share-url'});
		window.XMLHttpRequest = jest.fn(() => mockXmlHttp);

		ShareBox.init({url: '/share'});
		clickShare();
		loadXmlHttpRequest(mockXmlHttp);

		setImmediate(() => {
			expect(shareBoxElement.querySelector('.js-share-url').innerHTML).toBe('/share-url');
			expect(shareBoxElement.querySelector('.js-share-url-container').classList).toContain('u-display-inline');
			expect(shareBoxElement.querySelector('.js-share-url-container').getAttribute('aria-hidden')).toBe('false');
			expect(shareBoxElement.querySelector('.js-no-share-url-container').classList).toContain('u-display-none');
			expect(shareBoxElement.querySelector('.js-no-share-url-container').getAttribute('aria-hidden')).toBe('true');
			window.XMLHttpRequest = xmlHttp;
			done();
		});
	});

	it('Should display an error message if no share url is returned', (done) => {
		const mockXmlHttp = createMockHttpRequest({error: 'share url not available'});
		window.XMLHttpRequest = jest.fn(() => mockXmlHttp);

		ShareBox.init({url: '/share'});
		clickShare();
		loadXmlHttpRequest(mockXmlHttp);

		setImmediate(() => {
			expect(shareBoxElement.querySelector('.js-share-url').innerHTML.trim()).toBe('');
			expect(shareBoxElement.querySelector('.js-share-url-container').classList).toContain('u-display-none');
			expect(shareBoxElement.querySelector('.js-share-url-container').getAttribute('aria-hidden')).toBe('true');
			expect(shareBoxElement.querySelector('.js-no-share-url-container').classList).toContain('u-display-inline');
			expect(shareBoxElement.querySelector('.js-no-share-url-container').getAttribute('aria-hidden')).toBe('false');
			window.XMLHttpRequest = xmlHttp;
			done();
		});
	});

	it('Should display an error message if the share service is unavailable', (done) => {
		const mockXmlHttp = createMockHttpRequest({}, 500);
		window.XMLHttpRequest = jest.fn(() => mockXmlHttp);

		ShareBox.init({url: '/share'});
		clickShare();
		loadXmlHttpRequest(mockXmlHttp);

		setImmediate(() => {
			expect(shareBoxElement.querySelector('.js-share-url').innerHTML.trim()).toBe('');
			expect(shareBoxElement.querySelector('.js-share-url-container').classList).toContain('u-display-none');
			expect(shareBoxElement.querySelector('.js-share-url-container').getAttribute('aria-hidden')).toBe('true');
			expect(shareBoxElement.querySelector('.js-no-share-url-container').classList).toContain('u-display-inline');
			expect(shareBoxElement.querySelector('.js-no-share-url-container').getAttribute('aria-hidden')).toBe('false');
			window.XMLHttpRequest = xmlHttp;
			done();
		});
	});

	it('Should copy the url when clicking the copy button', (done) => {
		const mockXmlHttp = createMockHttpRequest({url: '/share-url'});
		window.XMLHttpRequest = jest.fn(() => mockXmlHttp);

		const getSelection = window.getSelection;
		const mockSelection = {
			selectAllChildren: jest.fn(),
			removeAllRanges: jest.fn()
		};
		window.getSelection = jest.fn().mockReturnValue(mockSelection);

		const execCommand = document.execCommand;
		document.execCommand = jest.fn();

		ShareBox.init({url: '/share'});
		clickShare();
		loadXmlHttpRequest(mockXmlHttp);

		setImmediate(() => {
			const shareUrlElement = document.querySelector('.js-share-url');
			clickCopy();

			expect(mockSelection.selectAllChildren).toHaveBeenCalledWith(shareUrlElement);
			expect(shareUrlElement.classList).toContain('c-article-share-box__only-read-input--highlighted');
			expect(document.execCommand).toHaveBeenCalledWith('copy');

			window.XMLHttpRequest = xmlHttp;
			window.getSelection = getSelection;
			document.execCommand = execCommand;
			done();
		});
	});
});
