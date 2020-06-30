# Global Expander

Click a trigger element to toggle the display of a unique target element.

## Usage

```javascript
import {expander} from 'global-expander/js';

expander(options);
```

```html
<button id="button1" data-expander data-expander-target="#target1">Expander 1</button>
<div id="target1">Target 1</div>
```

### JavaScript

For more flexibility you can use the Expander class directly:

```javascript
const trigger = document.querySelector('.my-trigger');
const target = document.querySelector('.my-target');

const myExpander = new Expander(trigger, target, options);

myExpander.init();
``` 

### Options

| Option             | Default Value | Type    | Description |
|--------------------|---------------|---------|-----------------------------------------------------------------------------------------------------------------------|
| TARGET_HIDE_CLASS  | 'u-js-hide'   | String  | HTML class to be toggled on the target                                                                                |
| TRIGGER_OPEN_CLASS | -             | String  | HTML class to be toggled to the trigger                                                                               |
| TRIGGER_OPEN_LABEL | -             | String  | Text to set on the trigger when open                                                                                  |
| CLOSE_ON_FOCUS_OUT  | true          | Boolean | Closes when you click or tab outside of the target                                                                           |
| AUTOFOCUS          | false         | Boolean | Set focus on the first tabbable element inside the target (will highlight text if appropriate, e.g. input with value) |
| FOCUS_EVENT          | false         | Boolean | Dispatch custom event on trigger just before expander focuses on target |

The data attribute options are the same, but are lowercase and hyphenated (and strings where the option is a boolean):

- `data-expander-target-hide-class`
- `data-expander-trigger-open-class`
- `data-expander-trigger-open-label`
- `data-expander-close-on-clickoff`
- `data-expander-autofocus`
- `data-expander-focus-event`

Note: data attribute options will take precedence over any options set during initialisation.

### Polyfills / Babel plugins required

- [plugin-transform-object-assign](https://babeljs.io/docs/en/babel-plugin-transform-object-assign)
