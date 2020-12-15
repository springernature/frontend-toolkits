# Nature brand

Use this context configuration in your product to skin components with the `nature` brand. The components you use should all be from the `nature` toolkit, or from the `global` toolkit using the `nature` settings configuration.

## Default Context

This package inherits everything from the [default context](../default/README.md), this means that when using this context you get everything from `default` plus everything from `nature` (brand context packages can add _and_ **overwrite** anything from `default`).

## Fonts

Web fonts are provided in the [fonts](./fonts) folder, and should be copied to your assets folder as part of your build process. Then add `@font-face` declarations depending on your asset location. A template is provided below:

### Example

```scss
@font-face {
	font-family: 'Source Sans Pro';
	src: url('fontsSourceSansPro-var.woff2') format('woff2-variations'), url('fontsSourceSansPro-Regular.woff2') format('woff2');
	font-display: swap;
}

@font-face {
	font-family: 'Source Sans Pro';
	src: url('fontsSourceSansPro-var.woff2') format('woff2-variations'), url('fontsSourceSansPro-Bold.woff2') format('woff2');
	font-display: swap;
	font-weight: bold;
}

@font-face {
	font-family: 'Source Sans Pro';
	src: url('fontsSourceSansPro-var-italic.woff2') format('woff2-variations'), url('fontsSourceSansPro-Italic.woff2') format('woff2');
	font-display: swap;
	font-style: italic;
}

@font-face {
	font-family: 'Source Sans Pro';
	src: url('fontsSourceSansPro-var-italic.woff2') format('woff2-variations'), url('fontsSourceSansPro-BoldItalic.woff2') format('woff2');
	font-display: swap;
	font-weight: bold;
	font-style: italic;
}

@font-face {
	font-family: 'Lora';
	src: url('fontsLora-Regular.woff2') format('woff2'), url('fontsLora-Regular.woff') format('woff');
	font-display: fallback;
}

@font-face {
	font-family: 'Lora';
	src: url('fontsLora-Bold.woff2') format('woff2'), url('fontsLora-Bold.woff') format('woff');
	font-display: swap;
	font-weight: bold;
}

@font-face {
	font-family: 'Lora';
	src: url('fontsLora-Italic.woff2') format('woff2'), url('fontsLora-Italic.woff') format('woff');
	font-display: swap;
	font-style: italic;
}

@font-face {
	font-family: 'Lora';
	src: url('fontsLora-BoldItalic.woff2') format('woff2'), url('fontsLora-BoldItalic.woff') format('woff');
	font-display: swap;
	font-weight: bold;
	font-style: italic;
}
```

## Favicons

Favicon image files are provided in the [img/favicons](./img/favicons) folder, and should be copied to your assets folder as part of your build process. Then add HTML depending on your asset location. A template is provided below:

```html
<link rel="apple-touch-icon" sizes="180x180" href="/path-to-your-app-assets/images/favicons/nature/apple-touch-icon.png"}}>
<link rel="icon" type="image/png" sizes="32x32" href="/path-to-your-app-assets/images/favicons/nature/favicon-32x32.png"}}>
<link rel="icon" type="image/png" sizes="16x16" href="/path-to-your-app-assets/images/favicons/nature/favicon-16x16.png"}}>
<link rel="manifest" href="/path-to-your-app-assets/manifest.json"}}>
<link rel="mask-icon" href="/path-to-your-app-assets/images/favicons/nature/safari-pinned-tab.svg"}} color="#000000">
<link rel="shortcut icon" href="/path-to-your-app-assets/images/favicons/nature/favicon.ico"}}>
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
            <square150x150logo src="/path-to-your-app-assets/images/favicons/nature/mstile-150x150.png"/>
            <TileColor>#000000</TileColor>
        </tile>
    </msapplication>
</browserconfig>
```