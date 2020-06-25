


# Global status Messages

A component for the display of status messages. Errors, feedback, change of status.

## Example


#### HTML
```html

<div {{#if dataTest}}data-test="{{dataTest}}" {{/if}}class="c-status-message c-status-message--{{type}}{{#if class}} {{class}}{{/if}} {{#if boxed}} c-status-message--boxed{{/if}}">
    <svg class="c-icon c-status-message__icon{{#if iconAlignedTop}} c-status-message__icon--top{{/if}}" {{#if size}}width="{{size}}" height="{{size}}" {{ else }}width="18" height="18"{{/if}} aria-hidden="true">
        <use xlink:href="#icon-{{type}}"></use>
    </svg>
    {{> @partial-block }}
</div>

```
