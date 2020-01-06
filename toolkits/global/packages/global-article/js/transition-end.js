/* global $ */
function TransitionEnd() {
	'use strict';

	var transition = (function () {
		var el = document.createElement('fake');
		var transitions = {
			transition: 'transitionend',
			MozTransition: 'transitionend',
			WebkitTransition: 'webkitTransitionEnd'
		};

		for (var t in transitions) {
			if (transitions.hasOwnProperty(t) && el.style[t] !== undefined) { // eslint-disable-line no-prototype-builtins
				return transitions[t];
			}
		}
		return null;
	})();

	$.fn.onTransitionEnd = function (callback) {
		var self = this;
		var node = self[0];

		var handler = function () {
			node.removeEventListener(transition, handler);
			callback(self);
		};

		if (transition) {
			node.addEventListener(transition, handler, false);
		} else {
			callback(false); // return false if no animation occurs
		}
		return self;
	};
}

if (typeof module !== 'undefined') {
	module.exports = TransitionEnd;
}
