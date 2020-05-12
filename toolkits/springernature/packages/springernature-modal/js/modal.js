class Modal {
	constructor(modalElement) {
		if (!modalElement || !modalElement.hasAttribute('id')) {
			console.error('Modal must be a valid DOM node with an ID.');
			return;
		}
		this.modal = modalElement;
		this.modalId = this.modal.getAttribute('id');
		this.triggers = Array.from(document.querySelectorAll(`[data-modal-for='${this.modalId}']`));
		this.closeButtons = document.querySelectorAll(`#${this.modalId} [data-component-modal-close]`);
		this.isMouseMove = false;
		this.preModalFocussedElement = null;
		this.focusableEls = Array.from(this.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));
		this.firstFocusableEl = this.focusableEls[0];
		this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
		this._registerEvents();
	}

	_registerEvents() {
		if (this.triggers.length > 0) {
			this.triggers.forEach(trigger => {
				trigger.addEventListener('click', event => {
					event.preventDefault();
					this.toggleModal();
				});
			});
		}
		if (this.closeButtons.length > 0) {
			Array.from(this.closeButtons).forEach(button => {
				button.addEventListener('click', this.toggleModal.bind(this));
			});
			window.addEventListener('click', this._windowOnClick.bind(this));
			window.addEventListener('mousemove', () => {
				this.isMouseMove = true;
			});
			window.addEventListener('mousedown', () => {
				this.isMouseMove = false;
			});
			window.addEventListener('mouseup', () => this._windowOnClick.bind(this));
		}

		this.modal.addEventListener('keydown', event => {
			event.stopImmediatePropagation();
			switch (event.code) {
				case 'Escape':
					this.toggleModal();
					this._restoreFocus();
					break;
				case 'Tab':
					if (event.shiftKey) {
						this._handleBackwardTab(event);
					} else {
						this._handleForwardTab(event);
					}
					break;
				default:
					break;
			}
		});
	}

	open() {
		this.preModalFocussedElement = document.activeElement;
		document.querySelector('html').classList.add('has-modal');
		document.body.append(this.modal);
		this.modal.classList.remove('js-hide');
		this.modal.setAttribute('aria-hidden', false);
		this.firstFocusableEl.focus();
	}

	close() {
		document.querySelector('html').classList.remove('has-modal');
		this.modal.classList.add('js-hide');
		this.modal.setAttribute('aria-hidden', true);
		this._restoreFocus();
	}

	toggleModal() {
		if (this.modal.classList.contains('js-hide')) {
			this.open();
		} else {
			this.close();
		}
	}

	_windowOnClick(event) {
		if (event.target === this.modal) {
			if (!this.isMouseMove) {
				this.toggleModal();
			}
		}
	}

	_restoreFocus() {
		if (this.preModalFocussedElement) {
			this.preModalFocussedElement.focus();
		}
	}

	_handleBackwardTab(event) {
		if (document.activeElement === this.firstFocusableEl) {
			event.preventDefault();
			this.lastFocusableEl.focus();
		}
	}

	_handleForwardTab(event) {
		if (document.activeElement === this.lastFocusableEl) {
			event.preventDefault();
			this.firstFocusableEl.focus();
		}
	}
}

export default Modal;
