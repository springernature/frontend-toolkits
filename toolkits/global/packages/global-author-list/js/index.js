import {makeArray, getDataOptions} from '@springernature/global-javascript/src/helpers';
import {authorList} from './author-list';

const DATA_COMPONENT = 'data-author-list';

const attributes = {
	headingSelector: DATA_COMPONENT + '-heading-selector',
	listSelector: DATA_COMPONENT + '-list-selector',
	authorHideClass: DATA_COMPONENT + '-author-hide-class',
	truncatedClass: DATA_COMPONENT + '-truncated-class',
	listModifierClass: DATA_COMPONENT + '-list-modifier-class',
	buttonClassList: DATA_COMPONENT + '-button-class-list',
	truncateLimit: DATA_COMPONENT + '-truncate-limit'
};

const authorLists = (options = {}) => {
	const authorListContainers = document.querySelectorAll(`[${DATA_COMPONENT}]`);

	if (authorListContainers.length === 0) {
		return;
	}

	makeArray(authorListContainers).forEach(authorListContainer => {
		const dataOptions = getDataOptions(authorListContainer, attributes);
		const config = {
			...options,
			...dataOptions
		};
		authorList(authorListContainer, config).init();
	});
};

export {authorLists};
