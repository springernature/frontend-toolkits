/* global $ */
const {Popup} = require('@springernature/global-popup/js/popup');

/**
 *
 * AuthorList supports generating the author popup boxes (if a popup group is provided)
 * and truncating the author list with et al. if a limit is specified by options.etal
 *
 */

function AuthorList() {
	'use strict';

	var create = function (authors, options) {
		options = options || {};

		var ETAL_CLASS = 'js-etal';
		var ETAL_COLLAPSED_CLASS = ETAL_CLASS + '-collapsed';
		var ETAL_COLLAPSED_TEXT = '[&hellip;]';
		var ETAL_EXPANDED_TEXT = 'Show fewer authors';
		var AUTHORS_EXPANDED_CLASS = 'js-authors-expanded';
		var HIDE_CLASS = 'u-js-hide';
		var SMALLSCREEN_SHOW_CLASS = 'js-mq480-show-inline';

		var exceedsFullscreenLimit;
		var exceedsSmallscreenLimit;

		var truncate = function (smallscreenLimit, fullscreenLimit) {
			// jscs:disable maximumLineLength
			var children = authors.querySelectorAll('li');
			var countAuthors = children.length;

			var exceedsLimit = function (limit) {
				// eslint-disable-next-line unicorn/prefer-includes
				return countAuthors > limit && !(countAuthors === limit + 1 && children[limit].classList.contains('c-article-author-institutional-author__author-name'));
			};

			var articleTitle = function () {
				var container = authors.closest('div');
				var title = container ? container.querySelector('h3[itemprop]') : null;
				if (title) {
					return title.textContent;
				}
				return 'this article';
			};

			var expandCollapseItem = function (cls, label, text) {
				var item = document.createElement('li');
				item.className = cls;
				var link = document.createElement('a');
				link.className = ETAL_CLASS;
				link.setAttribute('href', 'javascript:;');
				link.setAttribute('aria-label', label);
				link.setAttribute('title', label);
				link.innerHTML = text;
				item.appendChild(link);
				return item;
			};

			exceedsFullscreenLimit = exceedsLimit(fullscreenLimit);
			exceedsSmallscreenLimit = exceedsLimit(smallscreenLimit);

			var extraMoreAuthorsClasses = '';
			if (exceedsSmallscreenLimit && !exceedsFullscreenLimit) {
				extraMoreAuthorsClasses = HIDE_CLASS + ' ' + SMALLSCREEN_SHOW_CLASS;
			}

			var AUTHOR_LIST_CLASS = 'c-author-list';

			var fewerAuthorsItem = expandCollapseItem(
				AUTHOR_LIST_CLASS + '__show-less ' + HIDE_CLASS,
				'Show fewer authors for ' + articleTitle(),
				'-' + ETAL_EXPANDED_TEXT
			);
			var moreAuthorsItem = expandCollapseItem(
				AUTHOR_LIST_CLASS + '__show-more ' + extraMoreAuthorsClasses,
				'Show all ' + countAuthors + ' authors for ' + articleTitle(),
				ETAL_COLLAPSED_TEXT
			);

			if (exceedsFullscreenLimit || exceedsSmallscreenLimit) {
				authors.classList.add(ETAL_COLLAPSED_CLASS);
				children[countAuthors - 2].parentNode.insertBefore(moreAuthorsItem, children[countAuthors - 2]);
				authors.appendChild(fewerAuthorsItem);

				Array.prototype.slice.call(children, 2, countAuthors - 1).forEach(function (el) {
					if (exceedsFullscreenLimit) {
						el.classList.add('js-author-etal');
					}
					if (exceedsSmallscreenLimit) {
						el.classList.add('js-smaller-author-etal');
					}
				});
			}
		};

		var toggleAuthors = function () {
			var items = authors.querySelectorAll('li');
			var itemCount = items.length;

			if (authors.classList.contains(ETAL_COLLAPSED_CLASS)) {
				authors.classList.add(AUTHORS_EXPANDED_CLASS);
				authors.classList.remove(ETAL_COLLAPSED_CLASS);
				if (exceedsFullscreenLimit) {
					items[itemCount - 4].classList.add(HIDE_CLASS);
					items[itemCount - 1].classList.remove(HIDE_CLASS);
				} else if (exceedsSmallscreenLimit) {
					items[itemCount - 4].classList.remove(SMALLSCREEN_SHOW_CLASS);
					items[itemCount - 1].classList.add(SMALLSCREEN_SHOW_CLASS);
				}
			} else {
				authors.classList.add(ETAL_COLLAPSED_CLASS);
				authors.classList.remove(AUTHORS_EXPANDED_CLASS);
				if (exceedsFullscreenLimit) {
					items[itemCount - 4].classList.remove(HIDE_CLASS);
				} else if (exceedsSmallscreenLimit) {
					items[itemCount - 4].classList.add(SMALLSCREEN_SHOW_CLASS);
					items[itemCount - 1].classList.remove(SMALLSCREEN_SHOW_CLASS);
				}
				items[itemCount - 1].classList.add(HIDE_CLASS);
			}
		};

		var authorPopup = function (link) {
			var POPUP_CLASS = 'c-author-popup';
			var AUTHOR_LINK_CLASS = POPUP_CLASS + '__link';
			var AUTHOR_LIST_CLASS = POPUP_CLASS + '__author-list';
			var AFFILIATIONS_ADDRESS = '.c-article-author-affiliation__address';
			var SUBHEADING_CLASS = POPUP_CLASS + '__subheading';
			var ORCID_CLASS = 'c-article-orcid';

			var removeSvgFrom = function (element) {
				var svg = element && element.querySelector('svg');
				if (svg) {
					element.removeChild(svg);
				}
			};

			var getBodyHtml = function (link, item) {
				var correspId = link.getAttribute('data-corresp-id');
				var correspLink = correspId ? document.getElementById('corresp-' + correspId) : null;
				var hrefs = [];
				var notes = [];
				var affiliations = [];

				var isPresentAffiliation = function (node) {
					return node && node.getAttribute('data-present-affiliation') === 'true';
				};

				Array.prototype.slice.call(item.querySelectorAll('sup > a'), 0).forEach(function (element) {
					if (!isPresentAffiliation(element.nextElementSibling)) {
						hrefs.push(element.hash);
					}
				});

				hrefs.forEach(function (href) {
					var authorInfo = document.querySelector(href);
					if (authorInfo) {
						var affiliationAddress = authorInfo.querySelector(AFFILIATIONS_ADDRESS);
						var presentID = authorInfo.getAttribute('id');

						if (affiliationAddress !== null) {
							affiliations.push(affiliationAddress.textContent);
						}

						// eslint-disable-next-line unicorn/prefer-includes
						if (presentID !== null && presentID.indexOf('n') > -1) {
							var presentAddress = authorInfo.querySelector('.js-present-address');
							if (presentAddress) {
								notes.push(presentAddress.textContent);
							} else {
								notes.push(authorInfo.textContent);
							}
						}
					}
				});

				affiliations = notes.concat(affiliations);

				if (correspLink) {
					affiliations.push('<a href="' + correspLink.getAttribute('href') + '" class="' + AUTHOR_LINK_CLASS + '" rel="nofollow">Contact ' + link.innerHTML + '</a>');
				}
				return '<ul class="' + AUTHOR_LIST_CLASS + '"><li>' + affiliations.join('</li><li>') + '</li></ul>';
			};

			var getHeadingHtml = function (link, item) {
				var html = link.innerHTML;
				return '<h3 id="author-' + id + '" class="' + SUBHEADING_CLASS + '" tabindex="0">' + html + '</h3>' + getOrcidHtml(item); // eslint-disable-line no-use-before-define
			};

			var getOrcidHtml = function (item) {
				var orcid = item.querySelector('a.js-orcid');
				var html = '';

				if (orcid) {
					html = '<a class="' + ORCID_CLASS + '" href="' + orcid.getAttribute('href') + '" target="_blank" rel="noopener"><span class="' + ORCID_CLASS + '__text">View ORCID ID profile</span></a>';
				}
				return html;
			};

			var getFooterHtml = function (id) {
				var item = document.getElementById(id);

				if (item) {
					var clone = item.cloneNode(true);
					var name = clone.querySelector('.js-search-name');
					if (name) {
						name.parentNode.removeChild(name);
					}
					return clone.innerHTML;
				}
				return '';
			};

			var getGroupHtml = function (id) {
				var item = document.getElementById(id);

				if (item) {
					var clone = item.cloneNode(true);
					var h3 = clone.querySelector('h3');
					var ul = clone.querySelector('ul');
					if (ul) {
						ul.classList.add('c-article-author-institutional-author__author-list--popup');
					}
					if (h3) {
						h3.parentNode.removeChild(h3);
					}
					return clone.innerHTML.replace(/[\r\n]/g, '');
				}
				return '';
			};

			var id = link.getAttribute('data-author-popup');
			var item = link.closest('li');

			var clone = link.cloneNode(true);
			removeSvgFrom(clone);

			var html = '<div role="region" id="popup-' + id + '" class="c-popup ' + POPUP_CLASS + ' u-font-family-serif u-js-hide" aria-labelledby="' + id + '"><section>';
			html += getHeadingHtml(clone, item);
			if (id.match(/^group/)) { // eslint-disable-line  unicorn/prefer-starts-ends-with
				html += getGroupHtml(id);
			} else {
				html += getBodyHtml(clone, item);
				html += getFooterHtml(id);
			}
			html += '</section></div>';

			var div = document.createElement('div');
			div.innerHTML = html;
			document.body.appendChild(div);

			new Popup(link, `popup-${id}`);
		};

		if (options.etal) {
			truncate(options.etalSmallscreen || options.etal, options.etal);
		}

		authors.classList.add('js-no-scroll');

		Array.prototype.slice.call(authors.querySelectorAll('sup > a'), 0).forEach(function (el) {
			el.setAttribute('tabIndex', '-1');
		});

		Array.prototype.slice.call(authors.querySelectorAll('a[data-author-popup]')).forEach(function(link){
			authorPopup(link);
		});


		authors.addEventListener('click', function (event) {
			var link = event.target.closest('a');
			if (link && link.classList.contains(ETAL_CLASS)) {
				toggleAuthors();
			}
		});
	};

	return {
		create: create
	};
}

if (typeof module !== 'undefined') {
	module.exports = AuthorList;
}
