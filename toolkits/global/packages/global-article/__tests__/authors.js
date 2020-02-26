const Authors =  require('../js/authors');
const $ = require('jquery');

describe('Authors', () => {
	beforeAll(() => {
		window.$ = $;
		window.Component = {};
	});

	beforeEach(() => {
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});
});
