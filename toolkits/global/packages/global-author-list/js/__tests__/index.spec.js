import {authorLists} from '../index';
import {authorList} from '../author-list';

jest.mock('../author-list', () => ({
	authorList: jest.fn(() => {
		return {
			init: jest.fn()
		};
	})
}));

const fixture = `
	<div data-author-list
		 data-author-list-heading-selector="h3"
		 data-author-list-list-selector="#author-list-id"
		 data-author-list-author-hide-class="js-hide"
		 data-author-list-truncated-class="js-truncated"
		 data-author-list-list-modifier-class="list-modifier-class"
		 data-author-list-button-class-list="btn btn--primary"
		 data-author-list-truncate-limit="3"
		 >
		<h3>Authors</h3>
		<ul id="author-list-id">
			<li>Author 1</li>
			<li>Author 2</li>
			<li>Author 3</li>
			<li>Author 4</li>
		</ul>
	</div>
`;

describe('Data Attribute API', () => {
	let authorListContainers;

	beforeEach(() => {
		authorList.mockClear();
		document.body.innerHTML = fixture;
		authorListContainers = document.querySelectorAll('[data-author-list]');
	});

	it('does not error if can\'t match data-author-list', () => {
		document.body.innerHTML = '';
		expect(() => {
			authorLists();
		}).not.toThrow();
	});

	it('initialises the component with a config from the data-attributes', () => {
		authorLists();
		expect(authorList).toHaveBeenCalledWith(authorListContainers[0], {
			headingSelector: 'h3',
			listSelector: '#author-list-id',
			authorHideClass: 'js-hide',
			truncatedClass: 'js-truncated',
			listModifierClass: 'list-modifier-class',
			buttonClassList: 'btn btn--primary',
			truncateLimit: '3'
		});
	});

	it('initialises the component with data-attributes overriding JS config', () => {
		authorLists({
			headingSelector: '.js-heading-selector',
			listSelector: '.js-list-selector'
		});

		expect(authorList).toHaveBeenCalledWith(authorListContainers[0], {
			headingSelector: 'h3',
			listSelector: '#author-list-id',
			authorHideClass: 'js-hide',
			truncatedClass: 'js-truncated',
			listModifierClass: 'list-modifier-class',
			buttonClassList: 'btn btn--primary',
			truncateLimit: '3'
		});
	});

	it('initialises the component with JS config when some data-attributes are missing', () => {
		authorListContainers[0].removeAttribute('data-author-list-heading-selector');
		authorListContainers[0].removeAttribute('data-author-list-list-selector');

		authorLists({
			headingSelector: '.js-heading-selector',
			listSelector: '.js-list-selector'
		});

		expect(authorList).toHaveBeenCalledWith(authorListContainers[0], {
			headingSelector: '.js-heading-selector',
			listSelector: '.js-list-selector',
			authorHideClass: 'js-hide',
			truncatedClass: 'js-truncated',
			listModifierClass: 'list-modifier-class',
			buttonClassList: 'btn btn--primary',
			truncateLimit: '3'
		});
	});
});
