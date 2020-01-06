/**
 *
 * Popups should be created and managed by PopupGroup instances.
 *
 * var group = new Popup.Group();
 *
 * A new popup instance is added to the group by calling PopupGroup#spawn
 *
 * var popup = group.spawn(triggerElement, contentElement, popupOptions);
 *
 * 	triggerElement: DOM reference to the element to position the popup against.
 * 	contentElement: DOM reference to the element to display as the popup content. This element must have an id attribute
 * 		and if it doesn't yet exist in the DOM, it will be appended to the body.
 *
 * The available popupOptions are:
 *
 * 	mainColSelector (string) - a selector for the main column area. Popups will be positioned
 * 		relative to this element + 5px, snapping left. Defaults to '.js-main-column' for historical reasons.
 *	setFocusOn (string) - a selector for the item to set focus on when the popup opens. Defaults to the first link in the content.
 *
 * Toggling display of a popup can done using Popup#toggle
 *
 * popup.toggle(event)
 *
 * where event is an optional event object which if present will stop the event propagation
 *
 */

window.Component.Popup = (function (win, document_) {
	'use strict';

	var COMPONENT_CLASS = 'c-author-popup';
	var COMPONENT_ARROW_CLASS = COMPONENT_CLASS + '__arrow';
	var COMPONENT_CLOSE_CLASS = COMPONENT_CLASS + '__close';
	var HIDE_PRINT_CLASS = 'u-hide-print';
	var CLOSE_CLASS = 'js-close';
	var FOCUS_CATCHER_CLASS = 'js-focus-catcher';
	var ABOVE = '-above';
	var BELOW = '-below';
	var ESC_KEY_CODE = 27;

	var Popup = function (trigger, content, group, options) {
		this.id = content.id;
		this.trigger = trigger;
		this.content = content;
		this.group = group;
		this.focusSelector = options.setFocusOn || 'a[href]:not(.' + FOCUS_CATCHER_CLASS + ')';
		this.columnSelector = options.mainColSelector || '.js-main-column';
		this.isOpen = false;
		this.build();
	};
	Popup.prototype = {
		build: function () {
			var focus = '<a href="javascript:;" class="' + FOCUS_CATCHER_CLASS + ' u-visually-hidden">Return to place in article</a>';
			var close = '<a href="javascript:;" class="' + COMPONENT_CLOSE_CLASS + ' ' + CLOSE_CLASS + '">Close</a>';
			var arrow = '<div class="' + COMPONENT_ARROW_CLASS + ' ' + COMPONENT_ARROW_CLASS + '-' + ABOVE + '"></div>';

			this.content.insertAdjacentHTML('afterbegin', focus);
			this.content.insertAdjacentHTML('beforeend', close + arrow + focus);

			if (!this.content.classList.contains(HIDE_PRINT_CLASS)) {
				this.content.classList.add(HIDE_PRINT_CLASS);
			}

			// eslint-disable-next-line unicorn/prefer-node-append
			document_.body.appendChild(this.content);
		},
		bindEvents: function () {
			var self = this;
			self.closeListener = self.close.bind(self);
			self.escapeListener = self.closeOnEscape.bind(self);
			self.clickAwayListener = self.closeOnClickAway.bind(self);

			self.content.querySelector('.' + CLOSE_CLASS).addEventListener('click', self.closeListener);
			self.content.querySelectorAll('.' + FOCUS_CATCHER_CLASS).forEach(function (element) {
				element.addEventListener('focus', self.closeListener);
			});
			document_.addEventListener('keyup', self.escapeListener);
			document_.addEventListener('click', self.clickAwayListener);
			win.addEventListener('resize', self.closeListener);
		},
		unbindEvents: function () {
			var self = this;
			self.content.querySelector('.' + CLOSE_CLASS).removeEventListener('click', self.closeListener);
			self.content.querySelectorAll('.' + FOCUS_CATCHER_CLASS).forEach(function (element) {
				element.removeEventListener('focus', self.closeListener);
			});
			document_.removeEventListener('keyup', self.escapeListener);
			document_.removeEventListener('click', self.clickAwayListener);
			win.removeEventListener('resize', self.closeListener);
		},
		open: function () {
			this.group.close();
			this.isOpen = true;
			this.bindEvents();

			this.content.style.display = 'block';
			this.content.style.visibility = 'hidden';

			var pos = this.pos();

			this.content.style.top = pos.top + 'px';
			this.content.style.left = pos.left + 'px';
			this.content.style.right = pos.right + 'px';
			this.content.style.visibility = 'visible';

			this.focus();
		},
		close: function () {
			this.unbindEvents();
			this.isOpen = false;
			this.content.style.display = 'none';
			this.returnFocus();
		},
		toggle: function (event) {
			if (event) {
				event.stopPropagation();
			}
			if (this.isOpen) {
				this.close();
			} else {
				this.open();
			}
		},
		closeOnEscape: function (event) {
			if (event.keyCode === ESC_KEY_CODE) {
				this.close();
			}
		},
		closeOnClickAway: function (event) {
			if (!event.target.closest('.' + COMPONENT_CLASS)) {
				this.close();
			}
		},
		pos: function () {
			var documentElement = document_.documentElement;
			var scroll = documentElement.scrollTop;
			var metrics = this.trigger.getClientRects()[0];
			var offset = {
				top: metrics.top + scroll,
				left: metrics.left
			};

			var arrow = this.content.querySelector('.' + COMPONENT_ARROW_CLASS);

			var windowWidth = documentElement.clientWidth;
			var availableWidth = Math.min(document_.querySelector(this.columnSelector).offsetWidth, windowWidth);

			var arrowHeight = 12;
			var arrowWidth = 20;
			var above = offset.top - this.content.offsetHeight - arrowHeight;
			var below = offset.top + metrics.height + arrowHeight;
			var overrun = metrics.left + this.content.offsetWidth - windowWidth + 20;
			var position = ABOVE;

			if (above < scroll) {
				position = BELOW;
				arrow.classList.remove(COMPONENT_ARROW_CLASS + '-' + ABOVE);
				arrow.classList.add(COMPONENT_ARROW_CLASS + '-' + BELOW);
			} else {
				arrow.classList.remove(COMPONENT_ARROW_CLASS + '-' + BELOW);
				arrow.classList.add(COMPONENT_ARROW_CLASS + '-' + ABOVE);
			}

			if (availableWidth < 600) {
				arrow.style.left = (offset.left + 5) + 'px';
			} else {
				arrow.style.left = Math.max(Math.round((metrics.width / 2) - (arrowWidth / 2)) + ((overrun > 0) ? overrun : 0), 5) + 'px';
			}

			return {
				left: (availableWidth < 600) ? 5 : Math.max(5, offset.left - 10),
				right: 5,
				top: (position === ABOVE) ? above : below
			};
		},

		focus: function () {
			var target = this.content.querySelector(this.focusSelector);
			if (target) {
				target.focus();
			}
		},
		returnFocus: function () {
			this.trigger.focus();
		}
	};

	var Group = function () {
		this.cache = {};
	};
	Group.prototype = {
		spawn: function (trigger, content, options) {
			var id = content.id;
			if (!this.cached(id)) {
				this.cache[id] = new Popup(trigger, content, this, options || {});
			}
			return this.cache[id];
		},
		close: function () {
			for (var id in this.cache) {
				if (this.cached(id) && this.cache[id].isOpen) {
					this.cache[id].close();
				}
			}
		},
		cached: function (id) {
			return Object.prototype.hasOwnProperty.call(this.cache, id);
		}
	};

	return {
		Group: Group
	};
})(window, document);
