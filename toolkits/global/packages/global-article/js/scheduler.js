/* global jQuery */

window.Component.Scheduler = (function ($, win) {
	// jscs:disable disallowDanglingUnderscores
	'use strict';

	var $win = $(win);

	/**
     * Split the event into it's type and namespace
     * @param {String} name - The event name
     * @return {Object} with two properties, ev: the event type, ns: the namespace or null
     */
	var split = function (name) {
		var dot = name.indexOf('.');
		/* eslint-disable no-negated-condition */
		return {
			// eslint-disable-next-line unicorn/prefer-string-slice
			ev: (dot !== -1) ? name.substr(0, dot) : name,
			// eslint-disable-next-line unicorn/prefer-string-slice
			ns: (dot !== -1) ? name.substr(dot + 1) : null
		};
	};

	/**
     * Remove items from an array
     * @param {Array} arr - An array of items to filter
     * @param {Function} predicate - Function to apply as a test on each item in `arr`
     * @return {Array} A new array with the filtered items removed
     */
	var reject = function (array, predicate) {
		var results = [];
		for (var i = 0; array[i]; ++i) {
			if (!predicate(array[i])) {
				results.push(array[i]);
			}
		}
		return results;
	};

	/**
     * Use namespaced events when registering our resize, scroll, etc... handlers
     * @param {String} ev - The event name
     */
	var namespace = function (ev) {
		return ev + '.redraw-scheduler';
	};

	/**
     * Register event handlers
     * @param {String} name - The event name, e.g. 'scroll' or 'resize.mymodule'
     * @param {Function} fn - Event handler
     * @param {Object} [scope=null] - Set `this` when executing the event handler
     */
	var register = function (name, fn, scope) {
		var info = split(name);
		var ev = info.ev;
		var ns = info.ns;
		/* eslint-disable no-use-before-define */
		if (!_events[ev]) {
			$win.on(namespace(ev), function (event) {
				self.notify(ev, event);
			});
			_events[ev] = true;
		}

		if (!_handlers[ev]) {
			_handlers[ev] = [];
		}

		_handlers[ev].push({
			fn: fn,
			ns: ns,
			scope: scope || null
		});
	};

	var deregister = function (name, fn) {
		var info = split(name);
		var ev = info.ev;
		var ns = info.ns;

		if (!_handlers[ev]) {
			return false;
		}

		if (!ns && !fn) {
			_handlers[ev] = [];
		} else if (!fn) {
			_handlers[ev] = reject(_handlers[ev], function (item) {
				return item.ns === ns;
			});
		} else if (!ns) {
			_handlers[ev] = reject(_handlers[ev], function (item) {
				return item.fn === fn;
			});
		} else {
			_handlers[ev] = reject(_handlers[ev], function (item) {
				return item.ns === ns && item.fn === fn;
			});
		}

		if (!_handlers[ev].length) { // eslint-disable-line unicorn/explicit-length-check
			_handlers[ev] = null;
		}
		return true;
	};

	/**
     * Invoke the event handler in the next animation frame
     * @param {String} name - The event name
     * @param {Function} fn - Event handler
     * @param {Object} [scope=null] - Set `this` when executing the event handler
     */
	var invoke = function (name, fn, scope) {
		win.requestAnimationFrame(function () {
			fn.call(scope || null, {type: name});
		});
	};

	var _tickers = {};
	var _handlers = {};
	var _events = {};

	var self = {
		/**
         * Register event handlers
         * @param {String} name - The event name, e.g. 'scroll' or 'resize.mymodule' multiple events can be space separated 'resize orientationchange'
         * @param {Function} fn - Event handler
         * @param {Object} [scope=null] - Set `this` when executing the event handler
         * @this {this.Component.Scheduler}
         */
		on: function (name, fn, scope) {
			var loaded = this._loaded();
			var events = name.split(/\s+/);
			for (var i = 0; events[i]; ++i) {
				if (loaded && events[i].match(/^load(\.|$)/)) {
					invoke('load', fn, scope);
				} else {
					register(events[i], fn, scope);
				}
			}
		},

		/**
         * Remove event handlers
         * @param {String} name - The event name, e.g. 'scroll' or 'resize.mymodule' multiple events can be space separated 'resize orientationchange'
         * @param {Function} fn - Event handler
         * @returns {Number} - A count of the events successfully removed
         * @this {this.Component.Scheduler}
         */
		off: function (name, fn) {
			var events = name.split(/\s+/);
			var count = 0;
			for (var i = 0; events[i]; ++i) {
				count += deregister(events[i], fn) ? 1 : 0;
			}
			return count;
		},

		/**
         * Remove all event handlers, cancel any pending updates, stop listening for events
         * @this {this.Component.Scheduler}
         */
		reset: function () {
			var ev;

			for (ev in _events) {
				if (_events.hasOwnProperty(ev)) { // eslint-disable-line no-prototype-builtins
					$win.off(namespace(ev));
				}
			}

			for (ev in _tickers) {
				if (_tickers.hasOwnProperty(ev) && _tickers[ev]) { // eslint-disable-line no-prototype-builtins
					win.cancelAnimationFrame(_tickers[ev]);
				}
			}

			_handlers = {};
			_tickers = {};
			_events = {};
		},

		/**
         * Trigger event handlers in the next animation frame
         * @param {String} ev - Event name e.g. 'resize', 'scroll' (no namespace)
         * @param {Object} data - Event data to pass to the event handlers
         * @this {this.Component.Scheduler}
         */
		notify: function (ev, data) {
			var update = function (ev, data) {
				var handlers = _handlers[ev] || [];
				for (var i = 0; handlers[i]; ++i) {
					handlers[i].fn.call(handlers[i].scope, data);
				}
			};

			if (!_tickers[ev] && _handlers[ev]) {
				_tickers[ev] = win.requestAnimationFrame(function () {
					update(ev, data);
					_tickers[ev] = false;
				});
			}
		},

		/**
         * Check if the page is loaded
         * @returns {Boolean} - true if the page is loaded, false otherwise
         * @this {this.Component.Scheduler}
         */
		_loaded: function () {
			return win.document.readyState === 'complete';
		}
	};

	return self;
})(jQuery, window);
