# Nature Context

Set the context for Nature branded products (currently an abstraction from `shunter-mosaic`).

- [Global Context](#global-context)
- [Fonts](#fonts)
- [Favicons](#favicons)

## Global Context

This package inherits from the [`global-context` package](https://github.com/springernature/frontend-global-toolkit/tree/master/packages/global-context), which details everything that is included with `nature-context`. This README will detail anything that is added for this specific brand.

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

Favicon image files are provided in the [img/favicons](img/favicons) folder, and should be copied to your assets folder as part of your build process. Then add HTML depending on your asset location. A template is provided below:

```html
<link rel="apple-touch-icon" sizes="180x180" href="/path-to-your-app-assets/images/favicons/nature/apple-touch-icon.png"}}>
<link rel="icon" type="image/png" sizes="32x32" href="/path-to-your-app-assets/images/favicons/nature/favicon-32x32.png"}}>
<link rel="icon" type="image/png" sizes="16x16" href="/path-to-your-app-assets/images/favicons/nature/favicon-16x16.png"}}>
<link rel="mask-icon" href="/path-to-your-app-assets/images/favicons/nature/safari-pinned-tab.svg"}} color="#000000">
<link rel="shortcut icon" href="/path-to-your-app-assets/images/favicons/nature/favicon.ico"}}>
<meta name="msapplication-square150x150logo" content="/path-to-your-app-assets/images/favicons/nature/mstile-150x150.png"}}>
<meta name="msapplication-TileColor" content="#000000">
<meta name="theme-color" content="#000000">
```

## License

[MIT License][info-license] &copy; 2018, Springer Nature

[info-license]: https://github.com/springernature/frontend-nature-toolkit/blob/master/LICENCE
