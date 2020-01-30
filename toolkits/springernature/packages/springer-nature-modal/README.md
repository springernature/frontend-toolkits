# Springer Nature Modal

Display a modal (pop-up) window

## Usage

```html
<button data-modal-for="example-modal">Click this button to open the modal</button>
<div data-component-modal id="example-modal" class="c-modal js-hide" tabindex="0">
    <div class="c-modal--content">
        <h4 class="c-modal--title u-mb20">Modal Title</h4>
        <div class="c-modal--body">
            <p>This is the modal! It has a <a data-component-modal-close class="close-modal-link btn-close" href="">link</a> that can also close it.</p>
        </div>
        <button data-component-modal-close class="c-modal--close btn-close link-like">&times;</button>
    </div>
</div>
```

```javascript
import Modal from '@springernature/springer-nature-modal';

const modalElement = document.querySelector('#example-modal'); //For multiple modals, prefer `document.querySelectorAll('[data-component-modal]');` and initilise on each instance
const exampleModal = new Modal(modalElement);

exampleModal.show(); // Programmatically opens the modal.
```


#### Required markup and attributes

| Element Attribute | Element | Description | Required? |
|---|---|---|---|
| `id`     | Modal element  | The modal element must have an id attribute that is unique | Yes |
| `data-modal-for` | Trigger link or button | If there is a modal trigger (eg. button), it must have this attrubute matching the id of the modal it is intending to open avoiding the need to write custom event listeners to open modal. This element should sit outside of the modal's element. | No |
| `data-component-modal-close`  | Close button element | Should be added to an element which closes the modal. Note this element must be nested inside the modal which it intends to close | No |
