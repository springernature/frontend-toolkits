var InternalNavigation = (function (window, document) {
	'use strict';

	return function () {
		var _emitter = null;
		var _sections = [];
		var _previousSectionId = null;
		var _offset = 0;
		var _exclude = null;
		var _hasReadingCompanion = false;

		function handleSectionChange() {
			var windowHeight = window.innerHeight;
			var clientTop = document.documentElement.clientTop;
			var sectionId = null;

			var offsetPos = function (element) {
				return element.getBoundingClientRect().top - clientTop;
			};

			_sections.forEach(function (element) {
				var pos = offsetPos(element);
				if (pos <= _offset + (windowHeight / 2)) {
					if (sectionId) {
						// eslint-disable-next-line unicorn/prefer-query-selector
						var section = document.getElementById(sectionId);
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

				if (element.getAttribute('disabled')) {
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
			var target = null;
			if (event.target && event.target.closest) {
				target = event.target.closest('a');
			}
			if (!target || !target.hash || (_exclude && target.classList.contains(_exclude))) {
				return;
			}

			if (target.pathname !== window.location.pathname) {
				return;
			}

			var toFigure = isFigureLink(target);
			var toReference = !toFigure && isReferenceLink(target);
			var id = target.hash.slice(1);
			// eslint-disable-next-line unicorn/prefer-query-selector
			var element = document.getElementById(id);

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
			window.addEventListener('scroll', function tweak() {
				window.removeEventListener('scroll', tweak);
				window.scrollBy(0, _offset * -1);
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
			var references = document.querySelector('div[data-container-section="references"]');
			return references && Boolean(references.querySelector(h));
		}

		return {
			init: function (config, scheduler, emitter) {
				_sections = document.querySelectorAll('.js-section-title');
				_offset = config.offset || 0;
				_exclude = config.exclude || 'js-no-scroll';
				_emitter = emitter;

				_emitter.on('rc.display', function (state) {
					_hasReadingCompanion = state;
				});
				scheduler.on('scroll resize orientationchange', handleSectionChange);
				document.body.addEventListener('click', handleClick, false);
			}
		};
	};
})(window, document);

if (typeof module !== 'undefined') {
	module.exports = InternalNavigation;
}
