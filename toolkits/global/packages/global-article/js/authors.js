/* global jQuery */

/**
 *
 * AuthorList supports generating the author popup boxes (if a popup group is provided)
 * and truncating the author list with et al. if a limit is specified by options.etal
 *
 */

window.Component.AuthorList = (function ($) {
	'use strict';

	var create = function ($authors, popupGroup, options) {
		options = options || {};

		var ETAL_CLASS = 'js-etal';
		var ETAL_COLLAPSED_CLASS = ETAL_CLASS + '-collapsed';
		var ETAL_COLLAPSED_TEXT = '[&hellip;]';
		var ETAL_EXPANDED_TEXT = 'Show fewer authors';
		var AUTHORS_EXPANDED_CLASS = 'js-authors-expanded';
		var HIDE_CLASS = 'u-js-hide';
		var SMALLSCREEN_SHOW_CLASS = 'js-mq480-show-inline';
		var SMALLSCREEN_HIDE_CLASS = 'js-mq480-hide';
		var SEPARATOR_SELECTOR = '.js-separator';

		var exceedsFullscreenLimit;
		var exceedsSmallscreenLimit;

		var truncate = function (smallscreenLimit, fullscreenLimit) {
			// jscs:disable maximumLineLength

			var $children = $authors.children();
			var numberAuthors = $children.length;

			var exceedsLimit = function (limit) {
				// eslint-disable-next-line unicorn/prefer-includes
				return numberAuthors > limit && !(numberAuthors === limit + 1 && $children.get(limit).className.indexOf('author-group') !== -1);
			};

			var articleTitle = function () {
				var $title = $authors.closest('div').find('h3[itemprop]');
				if ($title.length > 0) {
					return $title.get(0).textContent;
				}
				return 'this article';
			};

			exceedsFullscreenLimit = exceedsLimit(fullscreenLimit);
			exceedsSmallscreenLimit = exceedsLimit(smallscreenLimit);

			var extraMoreAuthorsClasses = '';
			var moreAuthorsHideClass = HIDE_CLASS;
			if (exceedsSmallscreenLimit && !exceedsFullscreenLimit) {
				extraMoreAuthorsClasses = HIDE_CLASS + ' ' + SMALLSCREEN_SHOW_CLASS;
				moreAuthorsHideClass = SMALLSCREEN_HIDE_CLASS;
			}

			var AUTHOR_LIST_CLASS = 'c-author-list';

			var fewerAuthorsItem = '<li class="' + AUTHOR_LIST_CLASS + '__show-less ' + HIDE_CLASS + '"><a href="javascript:;" class="' + ETAL_CLASS + '" aria-label="Show fewer authors for ' + articleTitle() + '">- ' + ETAL_EXPANDED_TEXT + '</a></li>';
			var moreAuthorsItem = '<li class="' + AUTHOR_LIST_CLASS + '__show-more ' + extraMoreAuthorsClasses + '"><a href="javascript:;" class="' + ETAL_CLASS + '" title="Show all ' + numberAuthors + ' authors" aria-label="Show all ' + numberAuthors + ' authors for ' + articleTitle() + '">' + ETAL_COLLAPSED_TEXT + '</a></li>';

			if (exceedsFullscreenLimit || exceedsSmallscreenLimit) {
				$authors.addClass(ETAL_COLLAPSED_CLASS).find('li').eq(-1).before(moreAuthorsItem).find(SEPARATOR_SELECTOR).addClass(moreAuthorsHideClass);
				$authors.append(fewerAuthorsItem);
			}

			if (exceedsFullscreenLimit) {
				$children.slice(2, numberAuthors - 1).addClass('js-author-etal');
			}
			if (exceedsSmallscreenLimit) {
				$children.slice(2, numberAuthors - 1).addClass('js-smaller-author-etal');
			}
		};

		var removeSvgFrom = function ($element) {
			var svg = $element[0] && $element[0].querySelector('svg');
			if (svg) {
				$element[0].removeChild(svg);
			}
		};

		var authorPopup = function (event, $link) {
			var POPUP_CLASS = 'c-author-popup';
			var AUTHOR_LINK_CLASS = POPUP_CLASS + '__link';
			var AUTHOR_LIST_CLASS = POPUP_CLASS + '__author-list';
			var AFFILIATIONS_ADDRESS = '.c-article-author-affiliation__address';
			var HEADING_CLASS = 'u-visually-hidden';
			var SUBHEADING_CLASS = POPUP_CLASS + '__subheading';
			var ORCID_CLASS = 'c-article-orcid';
			var FOOTER_HEADING = POPUP_CLASS + '__footer-heading';

			var getBodyHtml = function ($link, $item) {
				var correspId = $link.data('corresp-id');
				var $correspLink = correspId ? $('#corresp-' + correspId) : [];
				var hrefs = [];
				var notes = [];
				var affiliations = [];
				var presentAddresses = [];

				$item.find('sup').find('a').each(function () {
					var $element = $(this);
					if (!$element.next('span[data-present-affiliation="true"]').length) { // eslint-disable-line unicorn/explicit-length-check
						hrefs.push($element.prop('href').replace(/^[^#]*/, ''));
					}
				});
				hrefs.forEach(function (href) {
					var authorInfo = document.querySelector(href);
					var affiliationAddress = authorInfo.querySelector(AFFILIATIONS_ADDRESS);
					var presentID = authorInfo.getAttribute('id');

					if (affiliationAddress !== null) {
						affiliations.push(affiliationAddress.textContent);
					}

					// eslint-disable-next-line unicorn/prefer-includes
					if (presentID !== null && presentID.indexOf('n') > -1) {
						var presentAddress = authorInfo.querySelector('.js-present-address');
						// eslint-disable-next-line no-negated-condition
						if (presentAddress !== null) {
							notes.push(presentAddress.textContent.replace(/^\s*present\s+address:?\s*/i, ''));
						} else {
							notes.push(authorInfo.textContent);
						}
					}
				});

				affiliations = deduplicatePresentAddresses(affiliations.concat(notes), presentAddresses); // eslint-disable-line no-use-before-define

				if ($correspLink.length > 0) {
					affiliations.push('<a href="' + $correspLink.prop('href') + '" class="' + AUTHOR_LINK_CLASS + '" rel="nofollow">Contact ' + $link.html() + '</a>');
				}
				return '<ul class="' + AUTHOR_LIST_CLASS + '"><li>' + affiliations.join('</li><li>') + '</li></ul>';
			};
			var getHeadingHtml = function ($link) {
				var html = $link.html();

				return '<h2 id="author-dialog" class="' + HEADING_CLASS + '">Author Information</h2><h3 id="author-' + id + '" class="' + SUBHEADING_CLASS + '" tabindex="0">' + html + '</h3>'; // eslint-disable-line no-use-before-define
			};
			var getFooterHtml = function (id) {
				var $item = $('#' + id);

				if ($item.length > 0) {
					var $clone = $item.clone();
					$clone.find('.c-article-author-authors-search__title.js-search-name').remove();
					return '<h4 class="' + FOOTER_HEADING + '">Search for this author in:</h4>' + $clone.html();
				}
				return '';
			};
			var getGroupHtml = function (id) {
				var $item = $('#' + id);
				if ($item.length > 0) {
					var $clone = $item.clone();
					$clone.find('h3').remove();
					$clone.find('ul').addClass('c-article-author-institutional-author__author-list--popup');
					return $clone.html().replace(/[\r\n]/g, '');
				}
				return '';
			};
			var getOrcidHtml = function ($item) {
				var $orcid = $item[0].querySelector('a.js-orcid');
				var $html = '';

				if ($orcid !== null) {
					$html = '<a class="' + ORCID_CLASS + '"title="View ORCID ID profile" href="' + $orcid.getAttribute('href') + '" target="_blank" rel="noopener"><span class="' + ORCID_CLASS + '__text">View ORCID ID profile</span></a><div>';
				}
				return $html;
			};

			var id = $link.prop('href').split('#').pop();
			var $item = $link.closest('li');

			var $linkCopy = $link.clone();
			removeSvgFrom($linkCopy);

			var html = '<div role="region" id="popup-' + id + '" class="' + POPUP_CLASS + '" aria-labelledby="' + id + '" aria-describedby="author-dialog"><section>';
			html += getHeadingHtml($linkCopy);
			if (id.match(/^group/)) { // eslint-disable-line  unicorn/prefer-starts-ends-with
				html += getGroupHtml(id);
			} else {
				html += getBodyHtml($linkCopy, $item);
				html += getFooterHtml(id);
				html += getOrcidHtml($item);
			}
			html += '</section></div>';

			var popup = popupGroup.spawn($link[0], $(html)[0], {
				arrow: true,
				close: true,
				offset: 50,
				setFocusOn: 'h3#author-' + id,
				mainColSelector: '.c-page-layout__main, div.main-column'
			});
			popup.toggle(event);
		};

		var deduplicatePresentAddresses = function (affiliations, presentAddresses) {
			var n = affiliations.length;
			var m;
			while (n--) {
				m = presentAddresses.length;
				while (m--) {
					if (presentAddresses[m] === affiliations[n]) {
						presentAddresses.splice(m, 1);
						affiliations.splice(n, 1);
					}
				}
			}
			return affiliations;
		};

		var toggleAuthors = function () {
			if ($authors.hasClass(ETAL_COLLAPSED_CLASS)) {
				// if expanding
				$authors.addClass(AUTHORS_EXPANDED_CLASS);
				$authors.removeClass(ETAL_COLLAPSED_CLASS);
				if (exceedsFullscreenLimit) {
					$authors.find('li').eq(-3).addClass(HIDE_CLASS); // ellipsis separator
					$authors.find('li').eq(-2).find(SEPARATOR_SELECTOR).removeClass(HIDE_CLASS); // last item separator
					$authors.find('li:last').removeClass(HIDE_CLASS);
				} else if (exceedsSmallscreenLimit) {
					$authors.find('li').eq(-3).removeClass(SMALLSCREEN_SHOW_CLASS); // ellipsis separator
					$authors.find('li').eq(-2).find(SEPARATOR_SELECTOR).removeClass(SMALLSCREEN_HIDE_CLASS); // last item separator
					$authors.find('li:last').addClass(SMALLSCREEN_SHOW_CLASS);
				}
			} else {
				// if contracting
				$authors.addClass(ETAL_COLLAPSED_CLASS);
				$authors.removeClass(AUTHORS_EXPANDED_CLASS);
				if (exceedsFullscreenLimit) {
					$authors.find('li').eq(-3).removeClass(HIDE_CLASS); // ellipsis separator
					$authors.find('li').eq(-2).find(SEPARATOR_SELECTOR).addClass(HIDE_CLASS); // last item separator
				} else if (exceedsSmallscreenLimit) {
					$authors.find('li').eq(-3).addClass(SMALLSCREEN_SHOW_CLASS); // ellipsis separator
					$authors.find('li').eq(-2).find(SEPARATOR_SELECTOR).addClass(SMALLSCREEN_HIDE_CLASS); // last item separator
					$authors.find('li:last').removeClass(SMALLSCREEN_SHOW_CLASS);
				}
				$authors.find('li:last').addClass(HIDE_CLASS);
			}
			if (popupGroup) {
				popupGroup.close();
			}
		};

		if (options.etal) {
			truncate(options.etalSmallscreen || options.etal, options.etal);
		}

		$authors.find('a').addClass('js-no-scroll');
		$authors.find('sup').find('a').prop('tabIndex', '-1'); // don't let the hidden affiliation links get keyboard focus
		$authors.delegate('a', 'click', function (event) {
			var $link = $(event.target).closest('a');
			if ($link.hasClass(ETAL_CLASS)) {
				toggleAuthors(event, $link);
			} else if (popupGroup && !$link.parent().is('sup')) {
				authorPopup(event, $link);
				event.preventDefault();
			}
		});
	};

	return {
		create: create
	};
})(jQuery);
