# Springer Context

Set the context for Springer branded products.

- [Global Context](#global-context)

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

## License

[MIT License][info-license] &copy; 2018, Springer Nature

[info-license]: https://github.com/springernature/frontend-springer-toolkit/blob/master/LICENCE
