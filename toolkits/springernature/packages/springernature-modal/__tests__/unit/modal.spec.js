import Modal from '../../js/modal';

describe('Modal', () => {
	const html = `<a class="modal1-trigger" data-modal-for="modal1" href="#">Modal trigger link</a>
	<a class="modal1-trigger2" data-modal-for="modal1" href="#">Another trigger link</a>
		<div data-component-modal id="modal1" class="c-modal" tabindex="0">
			<div class="c-modal__content">
				<h4 class="c-modal__title u-mb20">Modal Title</h4>
				<p>This is the modal! It has a <a data-component-modal-close href="">link</a> that can also close it.</p>
				<button data-component-modal-close class="c-modal__close">&times;</button>
			</div>
		</div>`;

	beforeEach(() => {
		document.body.innerHTML = html;

		const modalElements = document.querySelectorAll('[data-component-modal]');
		modalElements.forEach(modal => {
			new Modal(modal);
		});
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	test('should be hidden initially', () => {
		const modalEl = document.querySelector('.c-modal');

		expect(modalEl.classList.contains('c-modal--open')).toBe(false);
	});

	describe('When it\'s trigger is clicked', () => {
		let modalEl;
		let trigger1;
		let trigger2;

		beforeEach(() => {
			modalEl = document.querySelector('.c-modal');
			trigger1 = document.querySelector('.modal1-trigger');
			trigger2 = document.querySelector('.modal1-trigger2');

			trigger1.click();
		});

		test('should be shown and focus given to the first focusable element', () => {
			expect(modalEl.classList.contains('c-modal--open')).toBe(true);
			expect(modalEl.getAttribute('aria-hidden')).toBe('false');
			expect(document.activeElement).toBe(modalEl.querySelector('a'));
		});

		test('should have it\'s element moved to the bottom', () => {
			let bodyElChildren = document.body.children;
			let bodyChildrenCount = document.body.children.length;
			let lastBodyEl = bodyElChildren[bodyChildrenCount - 1];
			expect(modalEl).toBe(lastBodyEl);
		});

		test('should be hidden after it\'s trigger has been clicked again', () => {
			trigger1.click();

			expect(modalEl.classList.contains('c-modal--open')).toBe(false);
			expect(modalEl.getAttribute('aria-hidden')).toBe('true');
		});

		test('should also be hidden if the second trigger was clicked', () => {
			trigger2.click();

			expect(modalEl.classList.contains('c-modal--open')).toBe(false);
			expect(modalEl.getAttribute('aria-hidden')).toBe('true');
		});

		describe('When the modal\'s close button is clicked', () => {
			let closeBtn;

			beforeEach(() => {
				closeBtn = document.querySelectorAll('[data-component-modal-close]')[0];

				closeBtn.click();
			});

			test('should dismiss the opened modal', () => {
				expect(modalEl.classList.contains('c-modal--open')).toBe(false);
			});
		});

		describe('When a link with the close modal data attribute is clicked', () => {
			let closeModalLink;

			beforeEach(() => {
				closeModalLink = document.querySelectorAll('[data-component-modal-close]')[1];

				closeModalLink.click();
			});

			test('should dismiss the opened modal', () => {
				expect(modalEl.classList.contains('c-modal--open')).toBe(false);
			});
		});

	});
});
