
window.Component.InternalNavigation = (function (win, doc) {
	'use strict';

	var _emitter = null;
	var _sections = [];
	var _previousSectionId = null;
	var _offset = 0;
	var _exclude = null;
	var _hasReadingCompanion = false;

	function handleSectionChange() {
		var windowHeight = win.innerHeight;
		var clientTop = doc.documentElement.clientTop;
		var sectionId = null;

		var offsetPos = function (el) {
			return el.getBoundingClientRect().top - clientTop;
		};

		_sections.forEach(function (el) {
			var pos = offsetPos(el);
			if (pos <= _offset + (windowHeight / 2)) {
				if (sectionId) {
					var section = doc.getElementById(sectionId);
					var prevSectionPos = offsetPos(section);
					var heightDiff = _offset - section.offsetHeight;

					if (prevSectionPos <= heightDiff) {
						sectionId = el.id;
					}
				} else {
					sectionId = el.id;
				}
			}
		});

		if (sectionId !== _previousSectionId) {
			_emitter.emit('nav.section', sectionId, _previousSectionId);
			_previousSectionId = sectionId;
		}
	}

	function focusElement(el) {
		var isA = function (name) {
			return el.nodeName.toLowerCase() === name;
		};

		var isInteractive = function () {
			var hasTabIndex = el.hasAttribute('tabindex');
			var isLink = isA('a') && el.href;
			var isButton = isA('button');
			var isInput = isA('input');
			var isTextArea = isA('textarea');
			if (el.disabled) {
				return false;
			}
			return hasTabIndex || isLink || isButton || isInput || isTextArea;
		};

		if (el) {
			if (!isInteractive()) {
				el.setAttribute('tabindex', '-1');
			}
			el.focus();
		}
	}

	function handleClick(e) {
		var target = e.target.closest('a');

		if (!target || !target.hash || (_exclude && target.classList.contains(_exclude))) {
			return;
		}

		if (target.pathname !== win.location.pathname) {
			return;
		}

		var toFigure = isFigureLink(target);
		var toReference = !toFigure && isReferenceLink(target);
		var id = hashToId(target.hash);
		var el = doc.getElementById(id);

		if (_hasReadingCompanion && (toFigure || toReference)) {
			if (toFigure) {
				_emitter.emit('nav.figure', id, target);
			} else if (toReference) {
				_emitter.emit('nav.reference', id, target);
			}
			e.preventDefault();
			return;
		}

		_emitter.emit('nav.anchor', id, target);
		focusElement(el);

		// let the browser scroll to the element, listen for the scroll event and
		// adjust the offset to accommodate the sticky header
		win.addEventListener('scroll', function tweak() {
			win.removeEventListener('scroll', tweak);
			win.scrollBy(0, _offset * -1);
		}, false);
	}

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

	function isReferenceLink(node) {
		var h = node.hash;
		if (!h) {
			return false;
		}
		var refs = doc.querySelector('div[data-container-section="references"]');
		return refs && Boolean(refs.querySelector(h));
	}

	function hashToId(hash) {
		return hash.substring(1);
	}

	return {
		init: function (config, scheduler, emitter) {
			_sections = doc.querySelectorAll('.js-section-title');
			_offset = config.offset || 0;
			_exclude = config.exclude || 'js-no-scroll';
			_emitter = emitter;

			_emitter.on('rc.display', function (state) {
				_hasReadingCompanion = state;
			});
			scheduler.on('scroll resize orientationchange', handleSectionChange);
			doc.body.addEventListener('click', handleClick, false);
		}
	};
})(window, document);
