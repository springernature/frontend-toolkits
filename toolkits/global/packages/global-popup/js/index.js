import {makeArray, getDataOptions} from '@springernature/global-context/js/helpers';

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

	_computePositions(trigger, content) {
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

		// distance from top of visible viewport - height of content html - height of arrow html
		// i.e. calculate where the popup needs to go in the space between the trigger and the top of the viewport
		const above = offset.top - this.content.offsetHeight - arrowHeight;


		// distance from top of visible viewport + height of trigger + height of arrow html
		// i.e. calculate where the popup needs to go relative to trigger's top:0 position
		const below = offset.top + triggerMetrics.height + arrowHeight;


		const overrun = triggerMetrics.left + this.content.offsetWidth - windowWidth + 20;


		let position = ABOVE;

		if (above < distanceScrolled) {
			position = BELOW;
			arrow.classList.remove(COMPONENT_ARROW_CLASS + '-' + ABOVE);
			arrow.classList.add(COMPONENT_ARROW_CLASS + '-' + BELOW);
		} else {
			arrow.classList.remove(COMPONENT_ARROW_CLASS + '-' + BELOW);
			arrow.classList.add(COMPONENT_ARROW_CLASS + '-' + ABOVE);
		}

		if (availableWidth < 600) {
			arrow.style.left = px(offset.left + 5);
		} else {
			arrow.style.left = px(Math.max(Math.round((triggerMetrics.width / 2) - (arrowWidth / 2)) + ((overrun > 0) ? overrun : 0), 5));
		}

		return {
			left: (availableWidth < 600) ? 5 : Math.max(5, offset.left - 10),
			right: 5,
			top: (position === ABOVE) ? above : below
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
