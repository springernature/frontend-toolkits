# Global Popup

Click a trigger element to build and display a popup. Popups are built from existing html in the DOM and require it to be there prior to initialisation.

Popups are absolutely positioned either above or below the trigger, based on a calculation of space in the viewport. Defaults to above. By default the popups calculate their width based on their contents.

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
<div data-popup-hook>
    <span data-popup data-popup-target="popupContent1">Popup trigger</span>
    <div id="popupContent1">
        <p>Some popup text</p>
    </div>
</div>

```

Two data attributes are required:

| Data attribute     | Type    | Description |
|--------------------|---------|-------------|
| data-popup         | Boolean | This is the popup trigger i.e. clicking this will open a popup |
| data-popup-target  | String  | This is the id of the element in the DOM that Global Popup will use to build the popup contents |

There are also options:

| Data attribute        | Type    | Description |
|-----------------------|---------|-------------|
| data-popup-min-width  | String  | Sets a min-width in css on the popup, e.g. "100px" |
| data-popup-max-width  | String  | Sets a max-width in css on the popup, e.g. "600px" |
| data-popup-hook       | String  | CSS selector. A popup will be inserted in to and positioned relative to this element. If this option is ommitted it defaults to the parent of the trigger. |

#### Directly

```javascript
import {Popup} from 'global-popup/js/popup';

const trigger = document.querySelector('span');
new Popup(trigger, 'popupContent1', { MIN_WIDTH: "100px", MAX_WIDTH: "600px", HOOK: ".some-classname" });
```

```html
<div class="some-classname">
    <span>Popup trigger</span>
    <div id="popupContent1">
        <p>Some popup text</p>
    </div>
</div>			
```
