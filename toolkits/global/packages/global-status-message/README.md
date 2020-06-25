


# Global status Messages

A component for the display of status messages. Errors, feedback, change of status.


# Icons

Icons may be included either through including the svg markup inline, link via a relative file path or however you see fit. See https://github.com/springernature/frontend-toolkits/tree/master/context/brand-context/default#icons and https://css-tricks.com/pretty-good-svg-icon-system/

## Example


#### HTML
```html

<div {{#if dataTest}}data-test="{{dataTest}}" {{/if}}class="c-status-message c-status-message--{{type}}{{#if class}} {{class}}{{/if}} {{#if boxed}} c-status-message--boxed{{/if}}">
  <svg class="c-icon c-status-message__icon{{#if iconAlignedTop}} c-status-message__icon--top{{/if}}"  width="18px" height="18px" viewBox="0 0 18 18" version="1.1" aria-hidden="true">
      <title>error</title>
      <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="error-box" transform="translate(-18.000000, -23.000000)">
              <g id="icon-/-error" transform="translate(18.000000, 23.000000)">
                  <circle id="Combined-Shape" fill="#C64040" cx="11.5" cy="11.5" r="11.5"></circle>
                  <polygon id="error" fill="#FFFFFF" points="7.61760871 16.6300001 11.3150001 12.9326088 15.0123914 16.6300001 16.6300001 15.0123914 12.9326088 11.3150001 16.6300001 7.61760871 15.0123914 6 11.3150001 9.69739134 7.61760871 6 6 7.61760871 9.69739134 11.3150001 6 15.0123914"></polygon>
              </g>
          </g>
      </g>
  </svg>
  {{> @partial-block }}
</div>

```
