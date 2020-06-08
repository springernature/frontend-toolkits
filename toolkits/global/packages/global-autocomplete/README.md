# Autocomplete component

Basic autocomplete function that listens to key events on a text input and fetches suggestions from a specified endpoint.

## Branding

The `global-autocomplete` component currently uses the `DEFAULT` brand only.

```scss
// Inlcude this with your settings
@import '@springernature/global-autocomplete/scss/10-settings/default';

// Include this with your other components
@import '@springernature/global-autocomplete/scss/50-components/autocomplete';
```

## Example usage

Please see contents of `demo/` folder for sample client JS.

A full handlebars demo is also in the demo folder, but following is the only HTML the
 component actually requires:

<input type="text" autocomplete="off" class="c-autocomplete" data-component-autocomplete>
