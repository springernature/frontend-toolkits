# Global status message

## Usage

First, include the necessary Sass files in your project. The `global-status-message` component uses the `DEFAULT` branding across _all_ of our products.

```scss
// Include this with your settings
@import '@springernature/global-status-message/scss/10-settings/default';

// Include this with your other components
@import '@springernature/global-status-message/scss/50-components/status-message';
```

Then compile the template located in the `./view` folder whenever the component is needed. See the `./demo/context.json` file to see what the data should look like. 

## Modifiers

### Boxed

```json
"boxed": "true"
```

Sets a border and padding around the status message.

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/boxed-default.png" />
</p>

### Type: success

```json
"type": "success"
```

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/success.png" />
</p>


<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/boxed-success.png" />
</p>

### Type: warning

```json
"type": "warning"
```

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/warning.png" />
</p>

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/boxed-warning.png" />
</p>

### Type: error

```json
"type": "error"
```

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/error.png" />
</p>

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/boxed-error.png" />
</p>

### Type: info

```json
"type": "info"
```

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/info.png" />
</p>

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/boxed-info.png" />
</p>

### Live region

Some status messages appear with a page/screen as it is loaded. Others may appear or change subject to JavaScript events. In the latter case, the status component should use an ARIA live region. 

```json
"liveRegion": "true"
```

When used correctly, this will mean screen readers announce the status message whenever it is added or changed.

#### Status changed

A status change just requires you to update the `message` and (where applicable) `type` properties. This is enough to trigger announcement by the live region.

#### Status added

To trigger announcement of a new status message, the live region must be added to the page before the icon and message inside it.

```html
<!-- first add the wrapper -->
<div class="c-status-message" role="status" aria-live="polite">
</div>

<!-- then add the contents -->
<div class="c-status-message" role="status" aria-live="polite">
    <svg class="c-status-message__icon" width="24" height="24" role="img" aria-label="warning:" focusable="false">
        <use xlink:href="path/to/warning.svg#i-warning"></use>
    </svg>
	<div class="c-status-message__message" tabindex="-1"{{#if id}} id="{{id}}-message"{{/if}}>
		A new warning message
	</div>
</div>
```

If you are compiling the handlebars template in the client, this is possible by omitting the `message` and `iconURL` properties in the initial data. 

### Focus

Where an `id` is supplied in the data, the status message can be focused programmatically. Focusing the message ensures it is visible in the viewport _and_ announces it in screen reader software. The status message is likely to also be the optimal focus position for (continued) keyboard interaction.
