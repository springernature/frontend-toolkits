# Nature Context

Set the context for Nature branded products (currently an abstraction from `shunter-mosaic`).

- [Global Context](#global-context)
- [Fonts](#fonts)

## Global Context

This package inherits from the [`global-context` package](https://github.com/springernature/frontend-global-toolkit/tree/master/packages/global-context), which details everything that is included with `nature-context`. This README will detail anything that is added for this specific brand.

## Fonts

Web fonts are provided in the top level `fonts` folder, and should be copied to your assets folder as part of your build process. Then add `@font-face` declarations depending on your asset location. A template is provided below:

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

## License

[MIT License][info-license] &copy; 2018, Springer Nature

[info-license]: https://github.com/springernature/frontend-nature-toolkit/blob/master/LICENCE
