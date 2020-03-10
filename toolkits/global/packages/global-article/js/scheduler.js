
var Scheduler = (function (window) {
	'use strict';

	var _tickers = {};
	var _handlers = {};
	var _events = {};
	var _eventHandlers = {};

	var hasProperty = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	};

	var split = function (name) {
		var parts = name.split('.');
		return {
			ev: parts[0],
			ns: parts[1] || null
		};
	};

	var reject = function (array, predicate) {
		var results = [];
		for (var i = 0; array[i]; ++i) {
			if (!predicate(array[i])) {
				results.push(array[i]);
			}
		}
		return results;
	};

	var register = function (name, fn, scope) {
		var info = split(name);
		var ev = info.ev;
		var ns = info.ns;

		if (!_events[ev]) {
			_eventHandlers[ev] = function (event) {
				self.notify(ev, event); // eslint-disable-line no-use-before-define
			};
			window.addEventListener(ev, _eventHandlers[ev], false);
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

		if (ns && fn) {
			_handlers[ev] = reject(_handlers[ev], function (item) {
				return item.ns === ns && item.fn === fn;
			});
		} else if (ns) {
			_handlers[ev] = reject(_handlers[ev], function (item) {
				return item.ns === ns;
			});
		} else if (fn) {
			_handlers[ev] = reject(_handlers[ev], function (item) {
				return item.fn === fn;
			});
		} else {
			_handlers[ev] = [];
		}

		if (!_handlers[ev].length > 0) {
			_handlers[ev] = null;
		}
		return true;
	};

	var invoke = function (name, fn, scope) {
		window.requestAnimationFrame(function () {
			fn.call(scope || null, {type: name});
		});
	};

	var loaded = function () {
		return window.document.readyState === 'complete';
	};

	var self = {
		on: function (name, fn, scope) {
			var events = name.split(/\s+/);
			for (var i = 0; events[i]; ++i) {
				if (loaded() && events[i].match(/^load(\.|$)/)) {
					invoke('load', fn, scope);
				} else {
					register(events[i], fn, scope);
				}
			}
		},

		off: function (name, fn) {
			var events = name.split(/\s+/);
			var count = 0;
			for (var i = 0; events[i]; ++i) {
				count += deregister(events[i], fn) ? 1 : 0;
			}
			return count;
		},

		reset: function () {
			var ev;

			for (ev in _events) {
				if (hasProperty(_events, ev)) {
					window.removeEventListener(ev, _eventHandlers[ev], false);
				}
			}

			for (ev in _tickers) {
				if (hasProperty(_tickers, ev) && _tickers[ev]) {
					window.cancelAnimationFrame(_tickers[ev]);
				}
			}

			_handlers = {};
			_tickers = {};
			_events = {};
			_eventHandlers = {};
		},

		notify: function (ev, data) {
			var update = function (ev, data) {
				var handlers = _handlers[ev] || [];
				for (var i = 0; handlers[i]; ++i) {
					handlers[i].fn.call(handlers[i].scope, data);
				}
			};

			if (!_tickers[ev] && _handlers[ev]) {
				_tickers[ev] = window.requestAnimationFrame(function () {
					update(ev, data);
					_tickers[ev] = false;
				});
			}
		}
	};

	return function () {
		return self;
	};
})(window);

if (typeof module !== 'undefined') {
	module.exports = Scheduler;
}
