# Springer Nature Modal

Display a modal (pop-up) window

## Requirements

A class name of `.js` on the document root element will be used to bootstrap visual styles for the modal. The class should be added via a micro (but blocking) script, placed as far up in the <head> of the document as possible.

```javascript
<script>
    // JS Detection Script
    (function(e){var t=e.documentElement,n=e.implementation;t.className='js';})(document)
</script>
```

## Usage

```html
<button data-modal-for="example-modal" class="c-modal__trigger">Click this button to open the modal</button>

<div data-component-modal id="example-modal" class="c-modal" tabindex="0">
    <div class="c-modal__content">
        <h4 class="c-modal__title">Modal Title</h4>
        <p>This is the modal! It has a <a data-component-modal-close href="">link</a> that can also close it.</p>
        <button data-component-modal-close class="c-modal__close">close modal</button>
    </div>
</div>
```

```javascript
import Modal from '@springernature/springernature-modal';

const modalElement = document.querySelector('#example-modal'); //For multiple modals, prefer `document.querySelectorAll('[data-component-modal]');` and initilise on each instance
const exampleModal = new Modal(modalElement);

// Programmatically opens the modal
exampleModal.open();

// Programmatically closes the modal
exampleModal.closes();
```

#### Required markup and attributes

| Element Attribute | Element | Description | Required? |
|---|---|---|---|
| `id`     | Modal element  | The modal element must have an id attribute that is unique | Yes |
| `data-modal-for` | Trigger link or button | If there is a modal trigger (eg. button), it must have this attrubute matching the id of the modal it is intending to open avoiding the need to write custom event listeners to open modal. This element should sit outside of the modal's element. | No |
| `data-component-modal-close`  | Close element | Should be added to an element which closes the modal. Note this element must be nested inside the modal which it intends to close. An optional `c-modal__close` class will style this as a close button. | No |
