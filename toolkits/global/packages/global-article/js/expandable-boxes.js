
function Boxes() {
	'use strict';

	var LABEL_ATTR = 'data-expandable-label';
	var LABEL_SELECTOR = '[' + LABEL_ATTR + ']';
	var BOX_SELECTOR = '[data-expandable-box]';
	var EXPANDED_CLASS = 'c-article-box--expanded';

	function init(boxes) {
		(boxes || []).forEach(function (box) {
			var title = titleFor(box);
			var controls = [
				'<div class="c-article-box__controls">',
				'<div class="c-article-box__fade"></div>',
				'<button aria-expanded="false" aria-controls="' + idFor(box) + '"><span class="c-article-box__button-text" ' + LABEL_ATTR + '></span><span class="u-visually-hidden">from ' + title + '</span></button>',
				'</div>'
			].join('');

			var trigger = 'button';

			box.insertAdjacentHTML('beforeend', controls);
			close(box);

			box.querySelector(trigger).addEventListener('click', function () {
				toggle(box);
			}, false);

			box.addEventListener('focusin', function () {
				if (document.activeElement.nodeName.toLowerCase() !== trigger) {
					open(box);
				}
			}, false);
		});

		window.addEventListener('hashchange', function () {
			var target = (location.hash) ? document.querySelector(location.hash) : null;
			var box = target && target.closest(BOX_SELECTOR);
			if (box) {
				open(box.parentNode);
			}
		});
	}

	function titleFor(box) {
		var caption = box.querySelector('figcaption:first-of-type');
		return caption && caption.textContent ? caption.textContent : 'this box';
	}

	function idFor(box) {
		return box.querySelector(BOX_SELECTOR).id;
	}

	function toggle(box) {
		if (box.isOpen) {
			close(box, true);
		} else {
			open(box);
		}
	}

	function open(box) {
		var expandable = box.querySelector(BOX_SELECTOR);
		var button = box.querySelector(LABEL_SELECTOR);
		expandable.parentNode.classList.add(EXPANDED_CLASS);
		expandable.style.height = 'auto';
		expandable.setAttribute('aria-hidden', 'false');
		button.parentNode.setAttribute('aria-expanded', 'true');
		button.textContent = 'Show less';
		box.isOpen = true;
	}

	function close(box, scroll) {
		var expandable = box.querySelector(BOX_SELECTOR);
		var button = box.querySelector(LABEL_SELECTOR);
		expandable.parentNode.classList.remove(EXPANDED_CLASS);
		expandable.style.height = '95px';
		expandable.setAttribute('aria-hidden', 'true');
		button.parentNode.setAttribute('aria-expanded', 'false');
		button.textContent = 'Show more';
		if (scroll) {
			expandable.scrollIntoView();
		}
		box.isOpen = false;
	}

	return {
		init: init
	};
}

if (typeof module !== 'undefined') {
	module.exports = Boxes;
}

