import {Expander} from '@springernature/global-expander/js/expander';

const Popup = class {
	constructor(trigger, id, options = {}) {
		this._trigger = trigger;
		this._id = id;
		this._options = options;
		this._content = document.querySelector(`#${this._id}`);
		this._className = 'c-popup';
		this._isOpen = false;
		this._arrowClass = `${this._className}__arrow`;
		this._closeClass = `${this._className}__close`;
		this._closeTextClass = `${this._className}__close-text`;
		this._closeButton = `<button class="${this._closeClass}"><span class="${this._closeTextClass}">Close</span></button>`;
		this._arrow = `<div class="${this._arrowClass}"></div>`;
		this._closeHandler = () => {
			this._close();
		};
		this._build();
		this._expander = new Expander(this._trigger, this._content, {OPEN_EVENT: true});
		this._bindEvents();
	}

	open() {
		this._expander.open();
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

		if (this._options.MAX_WIDTH) {
			this._content.style.maxWidth = this._options.MAX_WIDTH;
		}
		if (this._options.MIN_WIDTH) {
			this._content.style.minWidth = this._options.MIN_WIDTH;
		}
		const pos = this._calcPositioning();
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

		this._trigger.addEventListener('globalExpander:open', event => {
			event.preventDefault();

			if (this._isOpen) {
				return;
			}
			requestAnimationFrame(() => {
				this._positionPopup();
				this._content.focus();
			});

			window.addEventListener('resize', this._closeHandler);
		});

		this._getCloseButton().addEventListener('click', event => {
			event.preventDefault();
			this._close();
		});

		this._getCloseButton().addEventListener('keydown', event => {
			if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
				event.preventDefault();
				this._close();
				this._trigger.focus();
			}
		});

		this._content.addEventListener('keydown', event => {
			if (event.key === 'Escape') {
				event.preventDefault();
				this._close();
				this._trigger.focus();
			}
		});
	}

	_calcPositioning() {
		const distanceScrolled = document.documentElement.scrollTop;
		const defaultOffset = 5;
		const triggerMetricsCollection = this._trigger.getClientRects();
		const triggerMetrics = (triggerMetricsCollection.length > 0) ? triggerMetricsCollection[0] : {top: 0, left: 0};
		const offset = {
			top: triggerMetrics.top + distanceScrolled,
			left: triggerMetrics.left,
			right: defaultOffset
		};

		const originalOffsetLeft = offset.left;
		const arrow = this._content.querySelector(`.${this._arrowClass}`);
		const windowWidth = document.documentElement.clientWidth;
		const arrowHeight = 12;
		const arrowWidth = 20;
		const pagePadding = (this._options.PAGE_PADDING) ? this._options.PAGE_PADDING : 32;
		const mdBreakPoint = 768;
		const lgBreakPoint = 1024;

		// calc space above trigger
		const spaceAbove = offset.top - this._content.offsetHeight - arrowHeight;

		const abovePosition = offset.top - this._content.offsetHeight - arrowHeight;
		const belowPosition = offset.top + triggerMetrics.height + arrowHeight;

		// does the popup and its position overrun the width of the page and its padding
		const overrun = offset.left + this._content.offsetWidth - windowWidth + pagePadding;
		if (overrun > 0) {
			if (overrun > offset.left) {
				offset.left = defaultOffset;
			} else {
				offset.left -= overrun;
			}
		}

		let wrapped = false;
		// does the popup trigger content wrap onto multiple lines
		if (triggerMetrics.length > 1) {
			wrapped = true;
			if (windowWidth > lgBreakPoint) {
				offset.left = (triggerMetrics.left - (this._content.offsetWidth / 2)) + arrowWidth;
			}
		}

		let top;
		// if there is not enough room for popup above trigger
		if (spaceAbove < distanceScrolled) {
			top = belowPosition;
			arrow.classList.remove(this._arrowClass + '--above');
			arrow.classList.add(this._arrowClass + '--below');
		} else {
			top = abovePosition;
			arrow.classList.remove(this._arrowClass + '--below');
			arrow.classList.add(this._arrowClass + '--above');
		}

		if (windowWidth < mdBreakPoint) {
			// just position arrow 5px from trigger left
			arrow.style.left = this._px(originalOffsetLeft + 5);
		} else if (wrapped) {
			// wrapped text add arrow
			const triggerStartPos = Math.round((offset.left + this._content.offsetWidth) - triggerMetrics.left - arrowWidth);
			arrow.style.left = this._px(Math.round(this._content.offsetWidth - triggerStartPos));
		} else {
			arrow.style.left = this._px(Math.max(Math.round((triggerMetrics.width / 2) - (arrowWidth / 2)) + ((overrun > 0) ? overrun : 0), 5));
		}

		return {
			left: (windowWidth < mdBreakPoint) ? defaultOffset : offset.left,
			top: top,
			right: defaultOffset
		};
	}
};

export {Popup};
