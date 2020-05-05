# Brand Context

The `brand-context` package contains baseline configurations that provide skaffolding for products and toolkit components within each of the supported brands:

- [Default](./default/README.md)
- Nature
- Springer
- SpringerNature

## Using `brand-context` in your product

Pick a context brand to use in your product and make sure it is the first thing included in your SASS endpoints. For example, to use the `Nature` brand:


```scss
// core.scss
@import '@springernature/brand-context/nature/scss/core';

// components and product imports...
```

```scss
// enhanced.scss
@import '@springernature/brand-context/nature/scss/enhanced';

// components and product imports...
```

Make sure that the product and all components used by that product depend on the same version of the `brand-context` package, and that your component is configured to support your chosen brand.

## License

[MIT License][info-license] &copy; 2020, Springer Nature

[info-license]: https://github.com/springernature/frontend-nature-toolkit/blob/master/LICENCE
