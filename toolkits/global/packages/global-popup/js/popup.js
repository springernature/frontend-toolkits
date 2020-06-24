import {Expander} from '@springernature/global-expander/js/expander';

const Popup = class {
	constructor(trigger, id) {
		this._trigger = trigger;
		this._id = id;
		this._content = document.getElementById(this._id);
		this._expander = new Expander(this._trigger, this._content);
		this._className = 'c-popup';
		this._isOpen = false;
		this._arrowClass = `${this._className}__arrow`;
		this._closeClass = `${this._className}__close`;
		this._closeButton = `<a href="javascript:;" class=${this._closeClass}>Close</a>`;
		this._arrow = `<div class=${this._arrowClass}></div>`;
		this._closeHandler = () => {
			this._close();
		};
		this._build();
		this._bindEvents();
	}

	_build() {
		this._content.insertAdjacentHTML('beforeend', this._closeButton + this._arrow);
		document.body.appendChild(this._content);
	}

	_positionPopup() {
		this._isOpen = true;

		var pos = this._calcPositioning();
		this._content.style.top = this._px(pos.top);
		this._content.style.left = this._px(pos.left);
		this._content.style.right = this._px(pos.right);
	}

	_close() {
		if (!this._isOpen) return;
		this._closeButton.click();
		this._isOpen = false;
		window.removeEventListener('resize', this._closeHandler);
	}

	_px(value) {
		return value + 'px';
	};

	_bindEvents() {
		this._expander.init();

		this._trigger.addEventListener('click', event => {
			event.preventDefault();
			if (this._isOpen) return;
			this._positionPopup();
			window.addEventListener('resize', this._closeHandler);
		});

		this._closeButton.addEventListener('click', event => {
			event.preventDefault();
			this._close();
		});
	}

	_calcPositioning(trigger, content) {
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
			// on narrow just position arrow 5px from trigger left
			arrow.style.left = this._px(offset.left + 5);
		} else {
			// position arrow in middle of trigger
			arrow.style.left = this._px(Math.round((triggerMetrics.width / 2) - arrowWidth));
		}

		return {
			left: (availableWidth < 600) ? 5 : offset.left,
			right: 5, // grow across page
			top: (position === 'above') ? abovePositioning : belowPositioning
		};
	}
};

export {Popup};
