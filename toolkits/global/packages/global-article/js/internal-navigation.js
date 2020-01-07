
window.Component.InternalNavigation = (function (win, document_) {
	'use strict';

	var _emitter = null;
	var _sections = [];
	var _previousSectionId = null;
	var _offset = 0;
	var _exclude = null;
	var _hasReadingCompanion = false;

	function handleSectionChange() {
		var windowHeight = win.innerHeight;
		var clientTop = document_.documentElement.clientTop;
		var sectionId = null;

		var offsetPos = function (element) {
			return element.getBoundingClientRect().top - clientTop;
		};

		_sections.forEach(function (element) {
			var pos = offsetPos(element);
			if (pos <= _offset + (windowHeight / 2)) {
				if (sectionId) {
					// eslint-disable-next-line unicorn/prefer-query-selector
					var section = document_.getElementById(sectionId);
					var previousSectionPos = offsetPos(section);
					var heightDiff = _offset - section.offsetHeight;

					if (previousSectionPos <= heightDiff) {
						sectionId = element.id;
					}
				} else {
					sectionId = element.id;
				}
			}
		});

		if (sectionId !== _previousSectionId) {
			_emitter.emit('nav.section', sectionId, _previousSectionId);
			_previousSectionId = sectionId;
		}
	}

	function focusElement(element) {
		var isA = function (name) {
			return element.nodeName.toLowerCase() === name;
		};

		var isInteractive = function () {
			var hasTabIndex = element.hasAttribute('tabindex');
			var isLink = isA('a') && element.href;
			var isButton = isA('button');
			var isInput = isA('input');
			var isTextArea = isA('textarea');
			if (element.disabled) {
				return false;
			}
			return hasTabIndex || isLink || isButton || isInput || isTextArea;
		};

		if (element) {
			if (!isInteractive()) {
				element.setAttribute('tabindex', '-1');
			}
			element.focus();
		}
	}

	function handleClick(event) {
		var target = event.target.closest('a');

		if (!target || !target.hash || (_exclude && target.classList.contains(_exclude))) {
			return;
		}

		if (target.pathname !== win.location.pathname) {
			return;
		}

		var toFigure = isFigureLink(target);
		var toReference = !toFigure && isReferenceLink(target);
		var id = hashToId(target.hash);
		// eslint-disable-next-line unicorn/prefer-query-selector
		var element = document_.getElementById(id);

		if (_hasReadingCompanion && (toFigure || toReference)) {
			if (toFigure) {
				_emitter.emit('nav.figure', id, target);
			} else if (toReference) {
				_emitter.emit('nav.reference', id, target);
			}
			event.preventDefault();
			return;
		}

		_emitter.emit('nav.anchor', id, target);
		focusElement(element);

		// let the browser scroll to the element, listen for the scroll event and
		// adjust the offset to accommodate the sticky header
		win.addEventListener('scroll', function tweak() {
			win.removeEventListener('scroll', tweak);
			win.scrollBy(0, _offset * -1);
		}, false);
	}

	// eslint-disable-next-line unicorn/consistent-function-scoping
	function insideReadingCompanion(node) {
		return Boolean(node.closest('.c-reading-companion'));
	}

	function isFigureLink(node) {
		var h = node.hash;
		if (!h || insideReadingCompanion(node)) {
			return false;
		}
		return h.match(/#(Fig|f|sf)\d+/);
	}

	// eslint-disable-next-line unicorn/consistent-function-scoping
	function isReferenceLink(node) {
		var h = node.hash;
		if (!h) {
			return false;
		}
		var references = document_.querySelector('div[data-container-section="references"]');
		return references && Boolean(references.querySelector(h));
	}

	// eslint-disable-next-line unicorn/consistent-function-scoping
	function hashToId(hash) {
		// eslint-disable-next-line unicorn/prefer-string-slice
		return hash.substring(1);
	}

	return {
		init: function (config, scheduler, emitter) {
			_sections = document_.querySelectorAll('.js-section-title');
			_offset = config.offset || 0;
			_exclude = config.exclude || 'js-no-scroll';
			_emitter = emitter;

			_emitter.on('rc.display', function (state) {
				_hasReadingCompanion = state;
			});
			scheduler.on('scroll resize orientationchange', handleSectionChange);
			document_.body.addEventListener('click', handleClick, false);
		}
	};
})(window, document);
