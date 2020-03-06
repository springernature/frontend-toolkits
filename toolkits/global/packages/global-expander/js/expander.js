import {makeArray} from '@springernature/global-context/js/helpers';

/**
 * Local Constants
 */

const defaultOptions = {
	TARGET_HIDE_CLASS: 'u-js-hide',
	TRIGGER_OPEN_CLASS: 'is-open',
	TRIGGER_OPEN_LABEL: undefined,
	CLOSE_ON_CLICKOFF: true,
	AUTOFOCUS: false
};

const Expander = class {
	constructor(trigger, target, options = {}) {
		this._options = Object.assign({}, defaultOptions, options);
		this._triggerEl = trigger;
		this._targetEl = target;
		this._originalTriggerText = trigger.textContent;
		this._targetTabbableItems = makeArray(target.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		));

		this._isOpen = false;

		this._handleButtonClick = this._handleButtonClick.bind(this);
		this._handleButtonEnter = this._handleButtonEnter.bind(this);
		this._handleDocumentClick = this._handleDocumentClick.bind(this);
		this._handleDocumentKeydown = this._handleDocumentKeydown.bind(this);
	}

	/**
	 * Event Handlers
	 */

	_handleButtonClick(event) {
		event.preventDefault();

		if (this._isOpen) {
			this._close();
		} else {
			this._open();
		}
	}

	_handleButtonEnter(event) {
		if (event.key === 'Enter') {
			event.preventDefault();

			if (this._isOpen) {
				this._close();
			} else {
				this._open();
			}
		}
	}

	_handleDocumentKeydown(event) {
		if (event.key === 'Escape') {
			this._close();
			this._triggerEl.focus();
		}

		if (event.key === 'Tab') {
			window.requestAnimationFrame(() => {
				if (!this._targetTabbableItems.includes(document.activeElement)) {
					this._close();
					this._triggerEl.focus();
				}
			});
		}
	}

	_handleDocumentClick(event) {
		let target = event.target;

		if (target === this._targetEl || target === this._triggerEl || this._targetEl.contains(target) || this._triggerEl.contains(target)) {
			return;
		}

		this._close();
	}

	/**
	 * Temporary Event Listeners
	 */

	_setupTemporaryEventListeners() {
		document.addEventListener('keydown', this._handleDocumentKeydown);

		if (this._options.CLOSE_ON_CLICKOFF) {
			document.addEventListener('click', this._handleDocumentClick);
		}
	}

	_removeTemporaryEventListeners() {
		document.removeEventListener('keydown', this._handleDocumentKeydown);

		if (this._options.CLOSE_ON_CLICKOFF) {
			document.removeEventListener('click', this._handleDocumentClick);
		}
	}

	/**
	 * Aria
	 */

	_updateAriaAttributes() {
		// eslint-disable-next-line unicorn/consistent-function-scoping
		const setBooleanAttribute = (element, attribute) => {
			if (element.hasAttribute(attribute)) {
				const attributeAsBoolean = element.getAttribute(attribute) === 'true';

				element.setAttribute(attribute, (!attributeAsBoolean).toString());
			}
		};

		setBooleanAttribute(this._triggerEl, 'aria-expanded');
		setBooleanAttribute(this._targetEl, 'aria-hidden');
	}

	/**
	 * Toggling
	 */

	_open() {
		if (this._isOpen) {
			return;
		}

		this._isOpen = true;

		this._triggerEl.classList.add(this._options.TRIGGER_OPEN_CLASS);
		this._targetEl.classList.remove(this._options.TARGET_HIDE_CLASS);

		if (this._options.TRIGGER_OPEN_LABEL) {
			this._triggerEl.textContent = this._options.TRIGGER_OPEN_LABEL;
		}

		if (this._options.AUTOFOCUS) {
			if (this._targetTabbableItems.length > 0) {
				const firstTabbableItem = this._targetTabbableItems[0];
				firstTabbableItem.focus();

				if (firstTabbableItem.setSelectionRange) {
					firstTabbableItem.setSelectionRange(0, firstTabbableItem.value.length);
				}
			}
		} else {
			this._targetEl.setAttribute('tabindex', '-1');
			this._targetEl.focus();
		}

		this._updateAriaAttributes();
		this._setupTemporaryEventListeners();
	}

	_close() {
		if (!this._isOpen) {
			return;
		}

		this._isOpen = false;

		this._triggerEl.classList.remove(this._options.TRIGGER_OPEN_CLASS);
		this._targetEl.classList.add(this._options.TARGET_HIDE_CLASS);

		if (this._options.TRIGGER_OPEN_LABEL) {
			this._triggerEl.textContent = this._originalTriggerText;
		}

		this._updateAriaAttributes();
		this._removeTemporaryEventListeners();
	}

	/**
	 * @public
	 */

	init() {
		if (this._triggerEl.tagName === 'A' && this._triggerEl.getAttribute('href').charAt(0) === '#') {
			// eslint-disable-next-line no-script-url
			this._triggerEl.setAttribute('href', 'javascript:;');
		}
		this._triggerEl.addEventListener('click', this._handleButtonClick);
		this._triggerEl.addEventListener('keydown', this._handleButtonEnter);
	}
};

export {Expander};
