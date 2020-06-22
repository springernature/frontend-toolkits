import {makeArray, getDataOptions} from '@springernature/global-javascript/src/helpers';

const Popups = class {
	constructor(className) {
		this._popupTriggers = makeArray(document.querySelectorAll('[data-popup]'));
		this._arrowClass = `${className}__arrow`;
		this._closeClass = `${className}__close`;
		this._closeButton = `<a href="javascript:;" class=${this._closeClass}>Close</a>`;
		this._arrow = `<div class=${this._arrowClass}></div>`;
	}

	_build(content) {
		content.insertAdjacentHTML('beforeend', this._closeButton + this._arrow);
		document.body.appendChild(content);
	}

	_px(value) {
		return value + 'px';
	};

	_calcPosition(trigger, content) {
		const distanceScrolled = document.documentElement.scrollTop;
		const triggerMetrics = trigger.getBoundingClientRect();
		const offset = {
			top: triggerMetrics.top + distanceScrolled,
			left: triggerMetrics.left
		};
		const arrow = content.querySelector(`.${this._arrowClass}`);
		const windowWidth = document.documentElement.clientWidth;
		const availableWidth = Math.min(document.querySelector(this.columnSelector).offsetWidth, windowWidth);
		const arrowHeight = 12;
		const arrowWidth = 20;

		// calc where to position the popup above the trigger
		// (trigger's distance from top of viewport - popup content's height - arrow's height)
		const abovePositioning = offset.top - this.content.offsetHeight - arrowHeight;

		// calc where to position the popup below the trigger
		// (trigger's distance from top of viewport + trigger's height + arrow's height)
		const belowPositioning = offset.top + triggerMetrics.height + arrowHeight;

		// calc popup's overrun of the width of the viewport
		// (trigger's distance from left of viewport + popup content's width - window's width)
		// const overrun = offset.left + this.content.offsetWidth - windowWidth;

		let position = 'above';
		// if there is not enough room for popup above trigger
		if (abovePositioning < distanceScrolled) {
			position = 'below';
			arrow.classList.remove(this._arrowClass + '--above');
			arrow.classList.add(this._arrowClass + '--below');
		} else {
			arrow.classList.remove(this._arrowClass + '--below');
			arrow.classList.add(this._arrowClass + '--above');
		}

		if (availableWidth < 600) {
			// on mobile just position arrow 5px from trigger left
			arrow.style.left = this._px(offset.left + 5);
		} else {
			// position arrow in middle of trigger
			arrow.style.left = this._px(Math.round((triggerMetrics.width / 2) - arrowWidth));
		}

		return {
			left: (availableWidth < 600) ? 5 : offset.left,
			right: 5, // width: 100% for absolutely positioned element
			top: (position === 'above') ? abovePositioning : belowPositioning
		};
	}

	init() {
		this._popupTriggers.forEach(trigger => {
			const content = document.querySelector(`#${trigger.getAttribute('data-popup-target')}`);
			this._build(content);
			this._bindEvents(trigger, content);
		})
	}
};

export {Popups};
