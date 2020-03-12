import {constants} from './constants';

/**
 * Local Constants
 */
const selector = {
	DROPDOWN: `.${constants.DROPDOWN}`,
	MENU: `.${constants.MENU}`
};

const defaultOptions = {
	BUTTON_CLASS: '',
	CLICK_OUTSIDE: true,
	DROPDOWN_CLASS: '',
	HIDE_CLASS: 'u-hide',
	HIDE_INITIALLY: true,
	MENU_POSITION: 'left'
};

const Dropdown = class {
	constructor(button, options = {}) {
		this._options = Object.assign({}, defaultOptions, options);

		this._buttonEl = button;

		this._dropdownEl = this._buttonEl.closest(selector.DROPDOWN);

		if (!this._dropdownEl) {
			throw new Error('Missing c-dropdown element');
		}

		this._menuEl = this._dropdownEl.querySelector(selector.MENU);

		if (!this._menuEl) {
			throw new Error('Missing c-menu element');
		}

		if (this._options.MENU_POSITION !== 'left' && this._options.MENU_POSITION !== 'right') {
			throw new Error(`MENU_POSITION must be left or right but was ${this._options.MENU_POSITION}`);
		}

		this._isOpen = false;

		this._handleButtonClick = this._handleButtonClick.bind(this);
		this._handleButtonEnter = this._handleButtonEnter.bind(this);
		this._handleClick = this._handleClick.bind(this);
		this._handleKeydown = this._handleKeydown.bind(this);
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

	/**
	 * Temporary Event Handlers
	 */

	_handleTargetOutside(element) {
		if (element === this._dropdownEl) {
			return;
		}

		do {
			if (element === document.body) {
				this._close();
				this._removeTemporaryEventHandlers();
				return;
			}

			element = element.parentNode;
		} while (element !== this._dropdownEl && element !== null && element.nodeType === 1);
	}

	_handleKeydown(event) {
		if (event.key === 'Escape' && this._isOpen) {
			this._close();
			this._buttonEl.focus();
		}

		if (event.key === 'Tab' && this._isOpen) {
			window.requestAnimationFrame(() => this._handleTargetOutside(document.activeElement));
		}
	}

	_handleClick(event) {
		const target = event.target;
		this._handleTargetOutside(target);
	}

	_setupTemporaryEventHandlers() {
		document.addEventListener('keydown', this._handleKeydown);

		if (this._options.CLICK_OUTSIDE) {
			document.addEventListener('click', this._handleClick);
		}
	}

	_removeTemporaryEventHandlers() {
		document.removeEventListener('keydown', this._handleKeydown);

		if (this._options.CLICK_OUTSIDE) {
			document.removeEventListener('click', this._handleClick);
		}
	}

	/**
	 * Update Aria
	 */

	_updateAriaAttributes() {
		if (this._isOpen) {
			this._buttonEl.setAttribute('aria-expanded', 'true');
		} else {
			this._buttonEl.setAttribute('aria-expanded', 'false');
		}
	}

	_open() {
		if (this._isOpen) {
			return;
		}

		this._isOpen = true;

		this._dropdownEl.classList.add(constants.DROPDOWN_OPEN_MODIFIER);
		this._menuEl.classList.remove(this._options.HIDE_CLASS);
		this._updateAriaAttributes();
		this._setupTemporaryEventHandlers();
	}

	_close() {
		if (!this._isOpen) {
			return;
		}

		this._isOpen = false;

		this._dropdownEl.classList.remove(constants.DROPDOWN_OPEN_MODIFIER);
		this._menuEl.classList.add(this._options.HIDE_CLASS);
		this._updateAriaAttributes();
		this._removeTemporaryEventHandlers();
	}

	/**
	 * @public
	 */

	init() {
		if (this._options.HIDE_INITIALLY) {
			this._menuEl.classList.add(this._options.HIDE_CLASS);
		}

		if (this._options.DROPDOWN_CLASS.length > 0) {
			this._dropdownEl.className = this._options.DROPDOWN_CLASS;
		}

		if (this._options.MENU_POSITION === 'right') {
			this._menuEl.classList.add('c-dropdown__menu--right');
		}

		if (this._options.BUTTON_CLASS.length > 0) {
			this._buttonEl.classList.add(this._options.BUTTON_CLASS);
		}

		this._buttonEl.addEventListener('click', this._handleButtonClick);
		this._buttonEl.addEventListener('keydown', this._handleButtonEnter);
	}
};

export {Dropdown};
