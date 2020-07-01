import {Expander} from '../../global-expander/js/expander';

const Popup = class {
	constructor(trigger, id) {
		this._trigger = trigger;
		this._id = id;
		this._content = document.querySelector(`#${this._id}`);
		this._className = 'c-popup';
		this._isOpen = false;
		this._expander = new Expander(this._trigger, this._content, {FOCUS_EVENT: true});
		this._arrowClass = `${this._className}__arrow`;
		this._closeClass = `${this._className}__close`;
		this._closeButton = `<a href="javascript:;" class="${this._closeClass}">Close</a>`;
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

	_getCloseButton() {
		return this._content.querySelector(`.${this._closeClass}`);
	}

	_positionPopup() {
		this._isOpen = true;

		var pos = this._calcPositioning();
		this._content.style.top = this._px(pos.top);
		this._content.style.left = this._px(pos.left);
		this._content.style.right = this._px(pos.right);
	}

	_close() {
		this._expander.close();
		this._isOpen = false;
		window.removeEventListener('resize', this._closeHandler);
	}

	_px(value) {
		return value + 'px';
	}

	_bindEvents() {
		this._expander.init();

		this._trigger.addEventListener('globalExpander:focusTarget', event => {
			event.preventDefault();
			if (this._isOpen) {
				return;
			}
			this._positionPopup();
			window.addEventListener('resize', this._closeHandler);
		});

		this._getCloseButton().addEventListener('click', event => {
			event.preventDefault();
			this._close();
		});

		this._getCloseButton().addEventListener('keydown', event => {
			if (event.key === 'Enter' || event.key === 'Space') {
				event.preventDefault();
				this._close();
			}
		});

		this._content.addEventListener('keydown', event => {
			if (event.key === 'Escape') {
				event.preventDefault();
				this._close();
			}
		});
	}

	_calcPositioning() {
		const distanceScrolled = document.documentElement.scrollTop;
		const triggerMetrics = this._trigger.getBoundingClientRect();
		const offset = {
			top: triggerMetrics.top + distanceScrolled,
			left: triggerMetrics.left
		};
		const arrow = this._content.querySelector(`.${this._arrowClass}`);
		const windowWidth = document.documentElement.clientWidth;
		const arrowHeight = 12;
		const arrowWidth = 20;

		// calc where to position the popup above the trigger
		// (trigger's distance from top of viewport - popup content's height - arrow's height)
		const abovePositioning = offset.top - this._content.offsetHeight - arrowHeight;

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

		if (windowWidth < 600) {
			// just position arrow 5px from trigger left
			arrow.style.left = this._px(offset.left + 5);
		} else {
			// position arrow in middle of trigger
			arrow.style.left = this._px(Math.round((triggerMetrics.width / 2) - arrowWidth));
		}

		return {
			left: (windowWidth < 600) ? 5 : offset.left,
			right: 5, // grow across page (width of popup controlled by css max-width)
			top: (position === 'above') ? abovePositioning : belowPositioning
		};
	}
};

export {Popup};
