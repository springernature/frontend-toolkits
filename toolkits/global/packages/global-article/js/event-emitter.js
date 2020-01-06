function EventEmitter() {
	this.listeners = {};
}

EventEmitter.prototype = {
	on: function (ev, fn, scope) {
		if (!this.listeners[ev]) {
			this.listeners[ev] = [];
		}
		this.listeners[ev].push({
			fn: fn,
			scope: scope || null
		});
	},
	off: function (ev, fn) {
		if (!this.listeners[ev]) {
			return false;
		}

		if (!fn) {
			this.listeners[ev] = [];
		}

		var n = this.listeners[ev].length;
		while (n--) {
			if (this.listeners[ev][n].fn === fn) {
				this.listeners[ev].splice(n, 1);
			}
		}

		if (!this.listeners[ev].length) { // eslint-disable-line unicorn/explicit-length-check
			this.listeners[ev] = null;
		}
		return true;
	},
	emit: function (ev) {
		var listeners = this.listeners[ev] || [];
		var emitArguments = [].slice.call(arguments, 1);
		for (var i = 0; listeners[i]; ++i) {
			listeners[i].fn.apply(listeners[i].scope, emitArguments);
		}
	}
};

if (typeof module !== 'undefined') {
	module.exports = EventEmitter;
}

