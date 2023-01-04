# Brand Context

[![NPM version][badge-npm]][info-npm]

The `brand-context` package contains baseline configurations that provide scaffolding for products and toolkit components within each of the supported brands:

- [Default](./default/README.md)
- [Nature](./nature/README.md)
- Springer
- SpringerNature

> **Note**
> As of brand-context `28.0.0`, all versions of Internet Explorer have been classfied for `core` browser support. Please refer to the latest [browser support guidelines](https://github.com/springernature/frontend-playbook/blob/main/practices/graded-browser-support.md) for help with how to include the brand-context in your application. To continue supporting IE11 as an enhanced browser, please use brand-context `<= 27.1.0`, and follow the [legacy browser support guidelines](https://github.com/springernature/frontend-playbook/blob/8b9df1bd729f0e737f33399238c1199a40034f30/practices/graded-browser-support.md)

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
[info-npm]: https://www.npmjs.com/package/@springernature/brand-context
[badge-npm]: https://img.shields.io/npm/v/@springernature/brand-context.svg
