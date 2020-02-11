# Springer Nature Context

Set the context for Springer Nature branded products.

- [Global Context](#global-context)
- [Fonts](#fonts)

## Global Context

This package inherits from the [`global-context` package](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/global/packages/global-context), which details everything that is included with `springer-nature-context`. This README will detail anything that is added for this specific brand.

## Fonts

Web fonts are provided in the top level `fonts` folder, and should be copied to your assets folder as part of your build process. Then add `@font-face` declarations depending on your asset location. A template is provided below:

### Example

```scss
@font-face {
	font-family: 'Daytona';
	font-style: normal;
	font-weight: 300;
	src: url('81a7ca0e-9ecd-494c-b5a8-8a71dee13b8d.woff') format('woff'), url(quote('eaec63df-29cb-4036-b52c-0128885fa6d8.woff2')) format('woff2');
	font-display: swap;
}

@font-face {
	font-family: 'Daytona';
	src: url('1e47f9c8-006c-47ea-a538-fda418eee2e8.eot?#iefix');
	src: url('1e47f9c8-006c-47ea-a538-fda418eee2e8.eot?#iefix') format('eot'), url('da2d8e8a-4058-41e5-bf2b-8e67a6ec9aa3.woff2') format('woff2'), url('3bf6a125-4948-46d6-b44a-25a39c5e1781.woff') format('woff'), url('34acddf5-e3d9-4456-87b6-e5c58cdd0450.ttf') format('truetype');
	font-weight: 700;
	font-display: swap;
}

@font-face {
	font-family: 'Merriweather';
	src: url('Merriweather-Light.ttf') format('truetype');
	font-weight: 300;
	font-display: swap;
}

@font-face {
	font-family: 'Merriweather';
	src: url('Merriweather-Regular.ttf') format('truetype');
	font-weight: 400;
	font-display: swap;
}

@font-face {
	font-family: 'Merriweather';
	src: url('Merriweather-Bold.ttf') format('truetype');
	font-weight: 700;
	font-display: swap;
}
```

## License

[MIT License][info-license] &copy; 2018, Springer Nature

[info-license]: https://github.com/springernature/frontend-springer-nature-toolkit/blob/master/LICENCE
