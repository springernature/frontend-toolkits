# Global status message

## Branding

The `global-status-message` component uses the `DEFAULT` branding across _all_ of our products.

```scss
// Include this with your settings
@import '@springernature/global-status-message/scss/10-settings/default';

// Include this with your other components
@import '@springernature/global-status-message/scss/50-components/status-message';
```

## Usage

#### HTML 

```html
<div class="c-status-message">
    Your text example
</div>

<!-- With Icon -->
<div class="c-status-message">
    <svg class="c-status-message__icon" width="24" height="24" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-success"></use>
    </svg>Your text
</div>
```
<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/default.png" />
</p>


### Modifiers

**Boxed** 

Sets a border and padding around the status message.

```html
<div class="c-status-message c-status-message--boxed">...</div>
```
<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/boxed-default.png" />
</p>


**Success**

```html
<!-- Default -->
<div class="c-status-message c-status-message--success">...</div>
```
<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/success.png" />
</p>

```html
<!-- Boxed -->
<div class="c-status-message c-status-message--success c-status-message--boxed">...</div>
```
<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/boxed-success.png" />
</p>

**Warning** 

```html
<!-- Default -->
<div class="c-status-message c-status-message--warning">...</div>
```

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/warning.png" />
</p>

```html
<!-- Boxed -->
<div class="c-status-message c-status-message--warning c-status-message--boxed">...</div>
```

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/boxed-warning.png" />
</p>

**Error**

```html
<!-- Default -->
<div class="c-status-message c-status-message--error">...</div>
```
<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/error.png" />
</p>

```html
<!-- Boxed -->
<div class="c-status-message c-status-message--error c-status-message--boxed">...</div>
```

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/boxed-error.png" />
</p>

**Info** 

```html
<!-- Default -->
<div class="c-status-message c-status-message--info">...</div>
```

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/info.png" />
</p>

```html
<!-- Boxed -->
<div class="c-status-message c-status-message--info c-status-message--boxed">...</div>
```

<p>
    <img width="300" src="https://github.com/springernature/frontend-toolkits/blob/global-status-message/toolkits/global/packages/global-status-message/img/boxed-info.png" />
</p>
