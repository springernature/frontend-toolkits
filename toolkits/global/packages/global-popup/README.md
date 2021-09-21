# Global Popup

Click a trigger element to build and display a popup. Popups are built from existing html in the DOM and require it to be there prior to initialisation.

Popups are absolutely positioned either above or below the trigger, based on a calculation of space in the viewport. Defaults to above. By default the popups calculate their width based on their contents.

The Popup is based on the Expander but differs in the following ways:

1. It moves keyboard focus to the target element on opening (necessitating the `aria-haspopup="true"` attribution as a warning to screen reader users)
2. It supplies a close button which sends focus back to trigger element on close

## Usage
There are two approaches for using Global Popup:
1. Data attribute API
2. Directly in your application

#### Data attribute API

```javascript
import {popup} from 'global-popup/js';

popup();
```

```html
<button type="button" data-popup data-popup-target="popupContent1">Popup trigger</button>
<div id="popupContent1">
    <p>Some popup text</p>
</div>
```

(The trigger must be a `<button>` element with `type="button"` for keyboard and screen reader accessibility.)

Two data attributes are required:

| Data attribute     | Type    | Description |
|--------------------|---------|-------------|
| data-popup         | Boolean | This is the popup trigger i.e. clicking this will open a popup |
| data-popup-target  | String  | This is the id of the element in the DOM that Global Popup will use to build the popup contents |

There are also options (add these to trigger element):

| Data attribute        | Type    | Description |
|-----------------------|---------|-------------|
| data-popup-min-width  | String  | Sets a min-width in css on the popup, e.g. "100px" |
| data-popup-max-width  | String  | Sets a max-width in css on the popup, e.g. "600px" |

#### Directly

```javascript
import {Popup} from 'global-popup/js/popup';

const trigger = document.querySelector('button');
new Popup(trigger, 'popupContent1', { MIN_WIDTH: "100px", MAX_WIDTH: "600px" });
```

```html
<div>
    <button type="button">Popup trigger</button>
    <div id="popupContent1">
        <p>Some popup text</p>
    </div>
</div>		
```

### Lazily

If you wish to lazily create a popup the first time the trigger is clicked - for example if building the html for your popup is an expensive operation that you'd like to defer until needed - you can use this pattern:


```javascript
import {Popup} from 'global-popup/js/popup';

const trigger = document.querySelector('button');
trigger.addEventListener('click', function() {
    const popup = new Popup(trigger, 'popupContent1');
    popup.open();
}, {capture: false, once: true});
```

```html
<div>
    <button type="button">Popup trigger</button>
    <div id="popupContent1">
        <p>Some popup text</p>
    </div>
</div>
```
