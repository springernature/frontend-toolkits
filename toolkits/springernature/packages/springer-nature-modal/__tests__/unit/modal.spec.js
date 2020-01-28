import Modal from '../../js/modal';

describe('Modal', () => {
	const html = `<a class="modal1-trigger" data-modal-for="modal1" href="#">Modal trigger link</a>
		<div data-component-modal id="modal1" class="c-modal js-hide" tabindex="0">
			<div class="c-modal--content">
				<h4 class="c-modal--title u-mb20">Modal Title</h4>
				<div class="c-modal--body">
					<p>This is the modal! It has a <a data-component-modal-close class="close-modal-link btn-close" href="">link</a> that can also close it.</p>
				</div>
				<button data-component-modal-close class="c-modal--close btn-close link-like">&times;</button>
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

		expect(modalEl.classList.contains('js-hide')).toBe(true);
	});

	describe('When it\'s trigger is clicked', () => {
		let modalEl;
		let trigger;

		beforeEach(() => {
			modalEl = document.querySelector('.c-modal');
			trigger = document.querySelector('.modal1-trigger');

			trigger.click();
		});

		test('should be shown and focus given to the first focusable element', () => {
			expect(modalEl.classList.contains('js-hide')).toBe(false);
			expect(modalEl.getAttribute('aria-hidden')).toBe('false');
			expect(document.activeElement).toBe(modalEl.querySelector('a'));
		});

		test('should have it\'s element moved to the bottom', () => {
			let bodyElChildren = document.body.children;
			let bodyChildrenCount = document.body.children.length;
			let lastBodyEl = bodyElChildren[bodyChildrenCount - 1];
			expect(modalEl).toBe(lastBodyEl);
		});

		test('should hidden after it\'s trigger has been clicked again', () => {
			trigger.click();

			expect(modalEl.classList.contains('js-hide')).toBe(true);
			expect(modalEl.getAttribute('aria-hidden')).toBe('true');
		});

		describe('When the modal\'s close button is clicked', () => {
			let closeBtn;

			beforeEach(() => {
				closeBtn = document.querySelector('.c-modal--close');

				closeBtn.click();
			});

			test('should dismiss the opened modal', () => {
				expect(modalEl.classList.contains('js-hide')).toBe(true);
			});
		});

		describe('When a link with the close modal class is clicked', () => {
			let closeModalLink;

			beforeEach(() => {
				closeModalLink = document.querySelector('.close-modal-link');

				closeModalLink.click();
			});

			test('should dismiss the opened modal', () => {
				expect(modalEl.classList.contains('js-hide')).toBe(true);
			});
		});

	});
});
