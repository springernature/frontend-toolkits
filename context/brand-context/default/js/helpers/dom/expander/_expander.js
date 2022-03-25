import {makeArray} from '../../util/make-array';
import {createEvent} from '../../util/create-event';

/**
 * Local Constants
 */

const defaultOptions = {
	TARGET_HIDE_CLASS: 'u-js-hide',
	TRIGGER_OPEN_CLASS: 'is-open',
	TRIGGER_OPEN_LABEL: undefined,
	CLOSE_ON_FOCUS_OUT: true,
	AUTOFOCUS: null,
	OPEN_EVENT: false,
	DEFAULT_OPEN: false
};

const Expander = class {
	constructor(trigger, target, options = {}) {
		this._options = Object.assign({}, defaultOptions, options);
		this._autoFocusElement = trigger;
		this._triggerEl = trigger;
		this._targetEl = target;
		this._originalTriggerText = trigger.textContent;
		this._isOpen = this._options.DEFAULT_OPEN;
		this._handleButtonClick = this._handleButtonClick.bind(this);
		this._handleButtonKeydown = this._handleButtonKeydown.bind(this);
		this._handleDocumentClick = this._handleDocumentClick.bind(this);
		this._handleDocumentKeydown = this._handleDocumentKeydown.bind(this);
	}

	/**
	 * Event Handlers
	 */

	_handleButtonClick(event) {
		event.preventDefault();

		if (this._isOpen) {
			this.close();
		} else {
			this.open();
		}
	}

	_handleButtonKeydown(event) {
		if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
			event.preventDefault();

			if (this._isOpen) {
				this.close();
			} else {
				this.open();
			}
		}
	}

	_handleDocumentKeydown(event) {
		if (event.key === 'Escape') {
			this.close();
			this._triggerEl.focus();
		}

		if (this._options.CLOSE_ON_FOCUS_OUT) {
			if (event.key === 'Tab' && event.shiftKey === true) {
				if (event.target === this._targetTabbableItems[0] || event.target === this._triggerEl || event.target === this._targetEl) {
					event.preventDefault();
					window.requestAnimationFrame(() => {
						this.close();
						this._triggerEl.focus();
					});
				}
			}

			if (event.key === 'Tab' && event.shiftKey === false) {
				if (event.target === this._targetTabbableItems[this._targetTabbableItems.length - 1]) {
					event.preventDefault();
					window.requestAnimationFrame(() => {
						this.close();
						this._triggerEl.focus();
					});
				}
			}
		}
	}

	_handleDocumentClick(event) {
		let target = event.target;

		if (target === this._targetEl || target === this._triggerEl || this._targetEl.contains(target) || this._triggerEl.contains(target)) {
			return;
		}

		this.close();
	}

	/**
	 * Temporary Event Listeners
	 */

	_setupTemporaryEventListeners() {
		document.addEventListener('keydown', this._handleDocumentKeydown);

		if (this._options.CLOSE_ON_FOCUS_OUT) {
			document.addEventListener('click', this._handleDocumentClick);
		}
	}

	_removeTemporaryEventListeners() {
		document.removeEventListener('keydown', this._handleDocumentKeydown);

		if (this._options.CLOSE_ON_FOCUS_OUT) {
			document.removeEventListener('click', this._handleDocumentClick);
		}
	}

	/**
	 * Attributes
	 */

	_updateAttributes() {
		// eslint-disable-next-line unicorn/consistent-function-scoping
		this._triggerEl.setAttribute('aria-expanded', this._isOpen.toString());

		if (this._isOpen) {
			this._targetEl.removeAttribute('hidden');
		} else {
			this._targetEl.setAttribute('hidden', '');
		}
	}

	/**
	 * Class attributes
	 */

	_updateClassAttributes() {
		if (this._isOpen) {
			this._triggerEl.classList.add(this._options.TRIGGER_OPEN_CLASS);
			this._targetEl.classList.remove(this._options.TARGET_HIDE_CLASS);
		} else {
			this._triggerEl.classList.remove(this._options.TRIGGER_OPEN_CLASS);
			this._targetEl.classList.add(this._options.TARGET_HIDE_CLASS);
		}
	}

	/**
	 * Trigger Label
	 */

	_updateTriggerLabel() {
		if (this._options.TRIGGER_OPEN_LABEL) {
			this._triggerEl.textContent = this._isOpen ? this._options.TRIGGER_OPEN_LABEL : this._originalTriggerText;
		}
	}

	/**
	 * Tabbable Items
	 */

	_updateTabbableItems() {
		this._targetTabbableItems = makeArray(this._targetEl.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)).filter(element => window.getComputedStyle(element).getPropertyValue('visibility') !== 'hidden');
	}

	/**
	 * AutoFocus
	 */

	_handleAutoFocus() {
		if (this._options.AUTOFOCUS === 'target') {
			this._autoFocusElement = this._targetEl;
			this._targetEl.setAttribute('tabindex', '-1');
		}
		if (this._options.AUTOFOCUS === 'firstTabbable') {
			this._autoFocusElement = this._targetTabbableItems.length > 0 && this._targetTabbableItems[0];
			if (this._autoFocusElement.setSelectionRange) {
				this._autoFocusElement.setSelectionRange(0, this._autoFocusElement.value.length);
			}
		}
		this._autoFocusElement.focus();
	}

	/**
	 * @public
	 */

	/**
	 * Toggling
	 */

	open() {
		if (this._isOpen) {
			return;
		}

		this._isOpen = true;

		this._updateTriggerLabel();
		this._updateAttributes();
		this._updateClassAttributes();
		this._updateTabbableItems();

		this._setupTemporaryEventListeners();
		this._handleAutoFocus();

		if (this._options.OPEN_EVENT) {
			const event = createEvent('open', 'globalExpander', {
				bubbles: false
			});
			this._triggerEl.dispatchEvent(event);
		}
	}

	close() {
		if (!this._isOpen) {
			return;
		}

		this._isOpen = false;

		this._updateTriggerLabel();
		this._updateAttributes();
		this._updateClassAttributes();

		this._removeTemporaryEventListeners();
	}

	init() {
		if (this._triggerEl.tagName === 'A' && this._triggerEl.getAttribute('href').charAt(0) === '#') {
			// eslint-disable-next-line no-script-url
			this._triggerEl.setAttribute('href', 'javascript:;');
			this._triggerEl.setAttribute('role', 'button');
		}

		// Warn screen reader users when you are stealing focus
		if (this._options.AUTOFOCUS) {
			this._triggerEl.setAttribute('aria-haspopup', 'true');
		}

		this._updateTriggerLabel();
		this._updateAttributes();
		this._updateClassAttributes();

		this._triggerEl.addEventListener('click', this._handleButtonClick);
		this._triggerEl.addEventListener('keydown', this._handleButtonKeydown);
	}
};

export {Expander};
