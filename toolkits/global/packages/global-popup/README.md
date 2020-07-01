# Global Popup

Click a trigger element to build and display a popup. Popups are built from existing html in the DOM and require it to be there prior to initialisation.

Popups are absolutely positioned either above or below the trigger, based on a calculation of space in the viewport. Defaults to above.

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
<span data-popup data-popup-target="popupContent1">Popup trigger</span>
<div id="popupContent1">
    <p>Some popup text</p>
</div>			
```

Three data attribute are required:

| Data attribute     | Type    | Description |
|--------------------|---------|-------------|
| data-popup         | Boolean | This is the popup trigger i.e. clicking this will open a popup |
| data-popup-target  | String  | This is the id of the element in the DOM that Global Popup will use to build the popup contents |

#### Directly

```javascript
import {Popup} from 'global-popup/js/popup';

const trigger = document.querySelector('span');
new Popup(trigger, 'popupContent1');
```

```html
<span>Popup trigger</span>
<div id="popupContent1">
    <p>Some popup text</p>
</div>			
```
