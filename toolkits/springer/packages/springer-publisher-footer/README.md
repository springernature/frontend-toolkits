# Springer Publisher Footer

Springer branded site footer.

## Usage

### Import the Sass

```scss
@import '../node_modules/@springernature/springer-publisher-footer/scss/10-settings/publisher-footer';
@import '../node_modules/@springernature/springer-publisher-footer/scss/50-components/publisher-footer';
```

### Template

The `./view` template file is designed to be consumable by your renderer. See `./demo/context.json` for the expected model / data schema. Note that the template does not include the `<footer>` wrapper. This allows you to combine this footer with the `global-corporate-footer` inside a common `<footer>` landmark/region.

### Cookie management

You can include a cookie management button inside the links array with the following:

```json
{
    "label": "Manage cookies",
    "action": "preferences"
}
```

Note the action property which places the `data-cc-action="preferences"` attribution on the button, needed to trigger the [cookie preferences dialogue documented here](https://cookie-consent.public.springernature.app/docs/getting-started/installation).
