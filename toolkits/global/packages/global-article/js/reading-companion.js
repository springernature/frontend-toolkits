
window.Component.ReadingCompanion = (function (win, document_) {
	'use strict';

	var READING_COMPANION_CLASS = 'c-reading-companion';

	var ACTIVE_MODIFIER = '--active';
	var SECTION_ITEM_CLASS = READING_COMPANION_CLASS + '__section-item';
	var ACTIVE_SECTION_CLASS = SECTION_ITEM_CLASS + ACTIVE_MODIFIER;

	var STICKY_MODIFIER = '--stuck';
	var STICKY_CLASS = READING_COMPANION_CLASS + '__sticky';

	var SECTION_ID_PREFIX = 'rc-sec-';
	var FIGURE_ID_PREFIX = 'rc-';
	var REFERENCE_ID_PREFIX = 'rc-';

	var TAB_NAME_ATTR = 'data-tab-target';
	var COMPONENT_ATTR = 'data-component';
	var ARIA_SELECTED_ATTR = 'aria-selected';
	var ARIA_CONTROLS_ATTR = 'aria-controls';
	var TABINDEX_ATTR = 'tabindex';

	var DATA_SRC_ATTR = 'data-src';
	var DATA_SRCSET_ATTR = 'data-srcset';

	var _isFullWidth = false;
	var _access = false;
	var _offset = 0;
	var _maxTabWidth = Number.MAX_VALUE;

	var _container = null;

	// eslint-disable-next-line unicorn/consistent-function-scoping
	function select(container, selector) {
		return Array.prototype.slice.call(container.querySelectorAll(selector));
	}

	function cleanLinks(html) {
		var d = document_.createElement('div');
		d.innerHTML = html;
		select(d, 'a').forEach(function (a) {
			var s = document_.createElement('span');
			s.innerHTML = a.innerHTML;
			a.parentNode.replaceChild(s, a);
		});
		return d.innerHTML;
	}

	function Section(node) {
		this.html = cleanLinks(node.innerHTML);
		this.text = node.textContent.replace(/[^a-z0-9\s]/ig, '');
		this.id = node.id;
	}

	Section.prototype.render = function () {
		return '<li id="' + SECTION_ID_PREFIX + this.id + '" class="' + SECTION_ITEM_CLASS + '"><a href="#' + this.id + '" data-track="click" data-track-action="section anchor" data-track-label="link:' + this.text + '">' + this.html + '</a></li>';
	};

	function Figure(node) {
		var suppInfoLink = node.querySelector('.c-article-supplementary__title a');

		if (suppInfoLink) {
			this.id = node.id;
			this.caption = suppInfoLink.innerHTML;
			this.link = suppInfoLink.href;
			this.images = [this.placeholderFor(suppInfoLink)];
		} else {
			this.id = (node.querySelector('.c-article-section__figure-caption') || {id: null}).id;
			this.caption = (node.querySelector('figcaption > b') || {innerHTML: 'Figure'}).innerHTML;
			this.link = (node.querySelector('.c-article__pill-button') || {href: null}).href;
			this.images = this.findImages(node);
		}
	}

	Figure.prototype = {
		findImages: function (node) {
			var images = [];
			var self = this;
			select(node, 'picture > img').forEach(function (element) {
				images.push(self.placeholderFor(element));
			});
			return images;
		},

		placeholderFor: function (node) {
			var source = node.getAttribute('data-supp-info-image') || node.src;
			var alt = node.alt || '';
			// eslint-disable-next-line unicorn/prefer-includes
			var separator = source.indexOf('?') === -1 ? '?' : '&';
			return [
				'<picture>',
				'<source type="image/webp" ' + DATA_SRCSET_ATTR + '="' + source + separator + 'as=webp">',
				'<img ' + DATA_SRC_ATTR + '="' + source + '" alt="' + alt + '">',
				'</picture>'
			].join('');
		},

		render: function () {
			return [
				'<li class="' + READING_COMPANION_CLASS + '__figure-item">',
				'<figure>',
				'<figcaption><b class="' + READING_COMPANION_CLASS + '__figure-title" id="' + FIGURE_ID_PREFIX + this.id + '">' + this.caption + '</b></figcaption>',
				this.images.join(''),
				(this.link) ? '<p class="' + READING_COMPANION_CLASS + '__figure-links">' : '',
				(this.link) ? '<a href="#' + this.id + '" data-track="click" data-track-action="figure anchor" data-track-label="link">View in article</a>' : '',
				(this.link && _access) ? '<a href="' + this.link + '" class="' + READING_COMPANION_CLASS + '__figure-full-link" data-track="click" data-track-action="view figure" data-track-label="link">Full size image<svg width="16" height="16" class="u-icon"><use href="#global-icon-chevron-right"/></svg></a>' : '',
				(this.link) ? '</p>' : '',
				'</figure>',
				'</li>'
			].join('');
		}
	};

	// eslint-disable-next-line unicorn/consistent-function-scoping
	function Reference(node) {
		var citation = node.querySelector('.c-article-references__text');
		this.id = citation.id;
		this.num = (node.querySelector('.c-article-references__counter') || {textContent: ''}).textContent;
		this.citation = citation.innerHTML;
		this.links = this.findLinks(node);
	}

	Reference.prototype.findLinks = function (node) {
		var links = [];
		select(node, '.c-article-references__links a').forEach(function (element) {
			links.push(new ReferenceLink(element));
		});
		return links;
	};

	Reference.prototype.render = function () {
		return [
			'<li class="' + READING_COMPANION_CLASS + '__reference-item">',
			'<p class="' + READING_COMPANION_CLASS + '__reference-citation" id="' + REFERENCE_ID_PREFIX + this.id + '">' + this.citation + '</p>',
			(this.links.length > 0) ? ('<ul class="' + READING_COMPANION_CLASS + '__reference-links">' + this.links.map(function (link) {
				return link.render();
			}).join('') + '</ul>') : '',
			'</li>'
		].join('');
	};

	// eslint-disable-next-line unicorn/consistent-function-scoping
	function ReferenceLink(node) {
		this.href = node.href;
		this.text = node.textContent;
	}
	ReferenceLink.prototype.render = function () {
		return '<li><a href="' + this.href + '" data-track="click" data-track-action="outbound reference" data-track-label="link">' + this.text + '</a></li>';
	};

	function sectionById(id) {
		// eslint-disable-next-line unicorn/prefer-query-selector
		return document_.getElementById(SECTION_ID_PREFIX + id);
	}

	function figureById(id) {
		// eslint-disable-next-line unicorn/prefer-query-selector
		return document_.getElementById(FIGURE_ID_PREFIX + id);
	}

	function referenceById(id) {
		// eslint-disable-next-line unicorn/prefer-query-selector
		return document_.getElementById(REFERENCE_ID_PREFIX + id);
	}

	function switchToTabAndScroll(name, node) {
		var focusClass = READING_COMPANION_CLASS + '--highlighted';
		var animationEnd = 'animationend';

		if (node) {
			switchToTab(name);
			node.setAttribute(TABINDEX_ATTR, '-1');
			node.focus();
			node.classList.add(focusClass);
			node.addEventListener(animationEnd, function cleanupAnimationEvent() {
				node.classList.remove(focusClass);
				node.removeEventListener(animationEnd, cleanupAnimationEvent);
			});
			node.scrollIntoView({block: 'start'});
		}
	}

	function loadDeferedAssets(parent) {
		select(parent, 'picture').forEach(function (pic) {
			var source = pic.querySelector('source');
			var img = pic.querySelector('img');
			source.srcset = source.getAttribute(DATA_SRCSET_ATTR);
			source.removeAttribute(DATA_SRCSET_ATTR);
			img.src = img.getAttribute(DATA_SRC_ATTR);
			img.removeAttribute(DATA_SRC_ATTR);
		});
	}

	function switchToTab(name, options) {
		var next = _container.querySelector('.' + READING_COMPANION_CLASS + '__' + name);
		var previous = _container.querySelector('.' + READING_COMPANION_CLASS + '__panel' + ACTIVE_MODIFIER);
		var defered;
		var nextButton;
		var previousButton;

		if (!next || !previous) {
			return;
		}

		defered = next.querySelector('img[' + DATA_SRC_ATTR + ']');
		nextButton = _container.querySelector('button[' + ARIA_CONTROLS_ATTR + '=' + next.id + ']');

		if (defered) {
			loadDeferedAssets(next);
		}

		if (previous) {
			previousButton = _container.querySelector('button[' + ARIA_CONTROLS_ATTR + '=' + previous.id + ']');
			previousButton.setAttribute(ARIA_SELECTED_ATTR, 'false');
			previousButton.setAttribute(TABINDEX_ATTR, '-1');
			previousButton.classList.remove(READING_COMPANION_CLASS + '__tab' + ACTIVE_MODIFIER);
			previous.classList.remove(READING_COMPANION_CLASS + '__panel' + ACTIVE_MODIFIER);
			previous.removeAttribute(TABINDEX_ATTR);
		}

		nextButton.setAttribute(ARIA_SELECTED_ATTR, 'true');
		nextButton.removeAttribute(TABINDEX_ATTR);
		nextButton.classList.add(READING_COMPANION_CLASS + '__tab' + ACTIVE_MODIFIER);
		next.classList.add(READING_COMPANION_CLASS + '__panel' + ACTIVE_MODIFIER);
		next.setAttribute(TABINDEX_ATTR, '0');
		if (options && options.focus) {
			nextButton.focus();
		}

		setTabWidth();
	}

	function setTabWidth() {
		_isFullWidth = _container.querySelector('.' + READING_COMPANION_CLASS + '__panel' + ACTIVE_MODIFIER + '.' + READING_COMPANION_CLASS + '__panel--full-width');
		reflowWidth();
	}

	function reflowWidth() {
		var parent = _container.parentNode;
		var width = parent.offsetWidth;

		if (width >= _maxTabWidth && _isFullWidth && _access) {
			width = (win.innerWidth - parent.getBoundingClientRect().left - 10);
		}
		_container.style.width = width + 'px';
	}

	function insertReturnButton(reference, source) {
		var button = reference.querySelector('.' + READING_COMPANION_CLASS + '__return');
		if (button) {
			// eslint-disable-next-line unicorn/prefer-node-remove
			button.parentNode.removeChild(button);
		}
		button = document_.createElement('a');
		button.href = '#' + source.id;
		// eslint-disable-next-line unicorn/prefer-node-append
		button.appendChild(document_.createTextNode('Return to ref ' + source.textContent + ' in article'));
		button.className = READING_COMPANION_CLASS + '__return';
		button.addEventListener('click', function () {
			// eslint-disable-next-line unicorn/prefer-node-remove
			button.parentNode.removeChild(button);
		});
		// eslint-disable-next-line unicorn/prefer-node-append
		reference.appendChild(button);
	}

	function scrollIntoView(element, parent) {
		var parentHeight = parent.clientHeight;
		var parentTop = parent.scrollTop + parent.offsetTop;
		var parentBottom = parentTop + parentHeight;
		var offset = parentHeight / 4;

		var elementTop = element.offsetTop;
		var elementBottom = elementTop + element.clientHeight;

		if (elementTop < parentTop) {
			parent.scrollTop -= ((parentTop - elementTop) + offset);
		} else if (elementBottom > parentBottom) {
			parent.scrollTop += ((elementBottom - parentBottom) + offset);
		}
	}

	function bindEvents(scheduler, emitter) {
		var article = document_.querySelector('div[' + COMPONENT_ATTR + '=article-container]');
		var sectionsList = _container.querySelector('.' + READING_COMPANION_CLASS + '__sections-list');
		var advert = _container.querySelector('.js-ad');
		var tabBar = _container.querySelector('.' + READING_COMPANION_CLASS + '__tabs');
		var sections = null;

		if (!sectionsList) {
			return;
		}

		sections = _container.querySelector('.' + READING_COMPANION_CLASS + '__sections-list').parentNode;

		var calcOffset = function () {
			return ((advert) ? advert.offsetHeight : 0) + _offset + ((tabBar) ? 80 : 20);
		};

		emitter.on('nav.section', function (id, previousId) {
			var previous = previousId && sectionById(previousId);
			var next = id && sectionById(id);

			if (previous) {
				previous.classList.remove(ACTIVE_SECTION_CLASS);
			}
			if (next) {
				next.classList.add(ACTIVE_SECTION_CLASS);
				scrollIntoView(next, sections);
			}
		});

		emitter.on('nav.figure', function (id) {
			switchToTabAndScroll('figures', figureById(id));
		});

		emitter.on('nav.reference', function (id, source) {
			var reference = referenceById(id);
			if (source) {
				insertReturnButton(reference, source);
			}
			switchToTabAndScroll('references', reference);
		});

		scheduler.on('scroll resize orientationchange', function () {
			_maxTabWidth = _container.parentNode.parentNode.offsetWidth;

			if (_container.parentNode.getBoundingClientRect().top <= _offset) {
				_container.classList.add(STICKY_CLASS + STICKY_MODIFIER);
			} else {
				_container.classList.remove(STICKY_CLASS + STICKY_MODIFIER);
			}

			var height = _container.offsetHeight;
			var intersection = article.getBoundingClientRect().bottom - document_.documentElement.clientTop - (height + _offset);

			if (_container.classList.contains(STICKY_CLASS + STICKY_MODIFIER)) {
				sections.style.maxHeight = (win.innerHeight - calcOffset()) + 'px';
			}

			if (intersection <= 0) {
				_container.style.top = (intersection + _offset) + 'px';
			} else {
				_container.style.top = _offset + 'px';
			}

			if (tabBar) {
				tabBar.style.maxWidth = _maxTabWidth + 'px';
			}

			reflowWidth();
		});

		if (tabBar) {
			tabBar.addEventListener('keydown', function (event) {
				var active = document_.activeElement.parentNode;
				var next;

				// eslint-disable-next-line unicorn/prefer-event-key
				if (event.keyCode === 37) {
					next = active.previousElementSibling || _container.querySelector('.' + READING_COMPANION_CLASS + '__tabs > li:last-child');
				// eslint-disable-next-line unicorn/prefer-event-key
				} else if (event.keyCode === 39) {
					next = active.nextElementSibling || _container.querySelector('.' + READING_COMPANION_CLASS + '__tabs > li:first-child');
				}
				if (next) {
					switchToTab(next.querySelector('[' + TAB_NAME_ATTR + ']').getAttribute(TAB_NAME_ATTR), {focus: true});
				}
			}, false);

			select(tabBar, '.' + READING_COMPANION_CLASS + '__tab').forEach(function (element) {
				element.addEventListener('click', function (event) {
					switchToTab(event.target.getAttribute(TAB_NAME_ATTR), {focus: true});
				}, false);
			});
		}
	}

	function htmlFor(name, data) {
		var map = {
			sections: function (sections) {
				var items = [];
				sections.forEach(function (element) {
					items.push(new Section(element));
				});

				return (items.length > 0) ? '<ul class="' + READING_COMPANION_CLASS + '__sections-list">' + items.map(function (item) {
					return item.render();
				}).join('') + '</ul>' : '';
			},
			figures: function (figures) {
				var items = [];
				figures.forEach(function (element) {
					var fig = new Figure(element);
					if (fig.id) {
						items.push(fig);
					}
				});

				if (!items.length) { // eslint-disable-line unicorn/explicit-length-check
					return '';
				}

				return '<ul class="' + READING_COMPANION_CLASS + '__figures-list">' + items.map(function (item) {
					return item.render();
				}).join('') + '</ul>';
			},
			references: function (references) {
				var items = [];
				references.forEach(function (element) {
					items.push(new Reference(element));
				});

				if (!items.length) { // eslint-disable-line unicorn/explicit-length-check
					return '';
				}

				return '<ol class="' + READING_COMPANION_CLASS + '__references-list' + ((items[0].num) ? ' ' + READING_COMPANION_CLASS + '__references-list--numeric' : '') + '">' + items.map(function (item) {
					return item.render();
				}).join('') + '</ol>';
			}
		};
		return (map[name]) ? map[name](data) : '';
	}

	function htmlForTab(id, text) {
		return '<li role="presentation"><button ' + TAB_NAME_ATTR + '="' + id + '" role="tab" id="tab-' + id + '" ' + ARIA_CONTROLS_ATTR + '="tabpanel-' + id + '" ' + ARIA_SELECTED_ATTR + '="false" ' + TABINDEX_ATTR + '="-1" class="' + READING_COMPANION_CLASS + '__tab">' + text + '</button></li>';
	}

	function buildTabBar(tabs) {
		return '<ul class="' + READING_COMPANION_CLASS + '__tabs" role="tablist">' + tabs.join('') + '</ul>';
	}

	// eslint-disable-next-line unicorn/consistent-function-scoping
	function insert(element, html) {
		element.insertAdjacentHTML('afterbegin', html);
	}

	function buildTabs() {
		var tabs = ['sections', 'figures', 'references'].map(function (name) {
			var container = document_.querySelector('.' + READING_COMPANION_CLASS + '__' + name);
			var html = htmlFor(name, select(document_, '.js-' + READING_COMPANION_CLASS + '-' + name + '-item'));
			// eslint-disable-next-line unicorn/prefer-string-slice
			var tab = htmlForTab(name, name.charAt(0).toUpperCase() + name.substring(1));

			if (html && container) {
				container.setAttribute('aria-labelledby', 'tab-' + name);
				insert(container, '<div class="' + READING_COMPANION_CLASS + '__scroll-pane">' + html + '</div>');
			} else if (container) {
				// eslint-disable-next-line unicorn/prefer-node-remove
				container.parentNode.removeChild(container);
			}

			return (html && container) ? tab : false;
		}).filter(function (tab) {
			return Boolean(tab);
		});

		var tabCount = tabs.length;
		if (tabCount > 1) {
			insert(_container, buildTabBar(tabs));
		} else if (tabCount === 1) {
			insert(_container, '<h3 class="' + READING_COMPANION_CLASS + '__heading">Sections</h3>');
		}
		return tabCount;
	}

	return {
		init: function (config, scheduler, emitter) {
			_access = Boolean(config.access);
			_offset = config.offset || 0;

			var initialised = false;

			var setup = function (mql) {
				if (initialised || mql.matches) { // eslint-disable-line no-use-before-define
					return;
				}

				_container = document_.querySelector('[' + COMPONENT_ATTR + '=reading-companion-sticky]');

				if (!_container) {
					return;
				}

				var tabCount = buildTabs();
				if (tabCount === 0) {
					return;
				}

				bindEvents(scheduler, emitter);
				if (tabCount > 1) {
					switchToTab('sections');
				}

				initialised = true; // eslint-disable-line no-use-before-define
			};

			var doSetup = function (mql) {
				setup(mql);
				emitter.emit('rc.display', !mql.matches && initialised);
			};

			var mq = win.matchMedia(config.matchMediaQuery || '(max-width: 639px)');
			mq.addListener(doSetup);
			doSetup(mq);
		}
	};
})(window, document);
