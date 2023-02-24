# Global status message

Status message lets you add different types of message banners to a page. These can either be always on the page or appear based on certain conditions or events.

## When to use this component

Use a status message when you need to tell the user something that is additional to the main content of the page. 

For example, use a: 

- success status message to tell the user that something they did has been successful
- warning status message to tell the user something they need to know about the content or service
- info status message to give the user extra information about the content they are looking at
- error status message to tell the user that something is not working

## When not to use this component

Do not use an error status message for form validation. Instead, use the validation and error summary from the [global forms component](https://elements.springernature.com/springernature/components/global-forms#validation).

## How it works

Use status messages sparingly. People often miss them and using them frequently will likely make this worse.

### Installation

To use the status message component, enter the following command in your Terminal:

`npm install @springernature/global-status-message`

Then, import the installed component code into your `scss` file:

```scss
// Include this with your settings
@import '@springernature/global-status-message/scss/10-settings/default';

// Include this with your other components
@import '@springernature/global-status-message/scss/50-components/status-message';
```

### Message types

Set the style of the message type by adding one of these modifiers.

**Warning**

```json
"type": "warning"
```

**Success**

```json
"type": "success"
```
**Info**

```json
"type": "info"
```
**Error**

```json
"type": "error"
```

To set a border and padding around a status message, use:

```json
"boxed": "true"
```

### Live region

If your status message appears or changes based on JavaScript events, then you need to use ARIA live region. This means that screen readers will announce the message when it appears or changes.

```json
"liveRegion": "true"
```

#### Status added

Add the live region to the page before the icon and message inside it.

```html
<!-- first add the wrapper -->
<div class="c-status-message" role="status" aria-live="polite">
</div>
```

Add the message and icon to this empty state by populating the `message` and `iconURL` properties in the data.

```html
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

#### Status changed

If you change the message after the page has loaded, a screen reader would announce the new message.

### Focus

Supply an `id` in the data to make the status message focusable programmatically.

Focusing the message ensures it is visible in the viewport and a screen reader will announce it. If it is not appropriate to move focus to the message, rely on the live region for announcement in screen readers.

The status message will likely be the best focus position for continued keyboard interaction.

## Template

Find a configurable template in the [status message view folder](https://github.com/springernature/frontend-toolkits/tree/main/toolkits/global/packages/global-status-message/view).

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#ask-elements Slack channel](https://springernature.slack.com/archives/CNBTFLBLP).
