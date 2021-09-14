/**
 * create-event.js
 * Wrapper for customEvent
 * Generate namespaced events
 */
'use strict';

/**
 * Polyfill customEvent
 * @function customEvent
 * @param {String} eventName namespaced name of the event
 * @param {Object=} _parameters customEvent options
 * @return {Event}
 */
const customEvent = (eventName, _parameters) => {
	_parameters = _parameters || {bubbles: false, cancelable: false, detail: undefined};
	var event = document.createEvent('CustomEvent');
	event.initCustomEvent(eventName, _parameters.bubbles, _parameters.cancelable, _parameters.detail);
	return event;
};

/**
 * Create a custom event
 * @function createEvent
 * @param {String} eventName name of the event
 * @param {String} namespace namespace e.g. component name
 * @param {Object=} _parameters customEvent options
 * @return {Event}
 */
const createEvent = (eventName, namespace, _parameters) => {
	if (namespace === undefined) {
		throw new Error('Missing namespace in `createEvent` function');
	}

	const event = typeof window.CustomEvent === 'function' ?
		new CustomEvent(`${namespace}:${eventName}`, _parameters) :
		customEvent(`${namespace}:${eventName}`, _parameters);

	return event;
};

export {createEvent};
