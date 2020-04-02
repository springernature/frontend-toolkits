import {makeArray, getDataOptions} from '@springernature/global-context/js/helpers';

const Popup = class {
	constructor(className) {
		this._popupTriggers = makeArray(document.querySelectorAll('[data-popup]'));
		this._componentClass = className;
		this._closeButton = `<a href="javascript:;" class=${this._componentClass + '__close'}>Close</a>`
		this._arrow = `<div class=${this._componentClass + '__arrow'}></div>`
	}

	_build(content) {
		content.insertAdjacentHTML('beforeend', this._closeButton + this._arrow);
		document.body.appendChild(content);
	}

	init() {
		this._popupTriggers.forEach(trigger => {
			const content = document.querySelector(`#${trigger.getAttribute('data-popup-target')}`);
			this._build(content);
		})
	}
};

export {Popup};
