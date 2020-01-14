# Springer Context

Set the context for Springer branded products.

- [Global Context](#global-context)
- [Favicons](#favicons)

## Global Context

This package inherits from the [`global-context` package](https://github.com/springernature/frontend-global-toolkit/tree/master/packages/global-context), which details everything that is included with `springer-context`. This README will detail anything that is added for this specific brand.

## Responsive Font Sizes

This package has a third party dependency on [Responsive Font Size (RFS)](https://github.com/twbs/rfs).
This is a peer dependency and must be imported, alongside the default RFS settings _before_ the global context. For example:

```scss
@import '../../../node_modules/@springernature/springer-context/scss/10-settings/rfs';
@import '../../../node_modules/rfs/scss';
@import '../../../node_modules/@springernature/springer-context/scss/enhanced';

// 10 Settings
// 20 Functions
// etc
```

## Favicons

Favicon image files are provided in the [img/favicons](img/favicons) folder, and should be copied to your assets folder as part of your build process. Then add HTML depending on your asset location. A template is provided below:

```html
<link rel="apple-touch-icon" sizes="180x180" href="/path-to-your-app-assets/images/favicons/springer-or-bmc/apple-touch-icon.png"}}>
<link rel="icon" type="image/png" sizes="32x32" href="/path-to-your-app-assets/images/favicons/springer-or-bmc/favicon-32x32.png"}}>
<link rel="icon" type="image/png" sizes="16x16" href="/path-to-your-app-assets/images/favicons/springer-or-bmc/favicon-16x16.png"}}>
<link rel="manifest" href="/path-to-your-app-assets/manifest.json"}}>
<link rel="mask-icon" href="/path-to-your-app-assets/images/favicons/springer-or-bmc/safari-pinned-tab.svg"}} color="#000000">
<link rel="shortcut icon" href="/path-to-your-app-assets/images/favicons/springer-or-bmc/favicon.ico"}}>
<meta name="msapplication-TileColor" content="#000000">
<meta name="msapplication-config" content="/path-to-your-app-assets/browserconfig.xml"}}>
<meta name="theme-color" content="#000000">
```

### Example manifest.json

```json
{
    "name": "Your Site",
    "short_name": "",
    "icons": [
        {
            "src": "/path-to-your-app-assets/images/favicons/nature/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/path-to-your-app-assets/static/images/favicons/nature/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#000000",
    "background_color": "#000000",
    "display": "standalone"
}

```

### Example browserconfig.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/path-to-your-app-assets/images/favicons/springer-or-bmc/mstile-150x150.png"/>
            <TileColor>#000000</TileColor>
        </tile>
    </msapplication>
</browserconfig>
```

## License

[MIT License][info-license] &copy; 2018, Springer Nature

[info-license]: https://github.com/springernature/frontend-springer-toolkit/blob/master/LICENCE
