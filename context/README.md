# Context

The context contains a single package - `brand-context` - that is configured (validated, published) in the same way as a toolkit package. It is very similar in structure to a toolkit package but with a few specific settings and rules.

The purpose of the `brand-context` is to set the `CSS` context for branded products. It sets the _baseline_ for your product by configuring one of the available brands.

- **Default**
- **Nature**
- **Springer**
- **SpringerNature**

The **default** brand provides shared SASS _variables_, _functions_ and _mixins_ and well as some default styles that can be used by all products, such as `normalize.scss`. You can use default by itself to provide an un-branded baseline for your product.

All the other brands - **nature**, **springer**, **springerNature** - _include_ the default brand, then build on top of that to provide brand specific SASS _variables_, _functions_ and _mixins_, as well as baseline brand specific styling to help you get started with your product.

A `brand-context` configuration is required by _ALL_ products that want to use components from one of the toolkits, and all components within the toolkits are built to work with at least _one_ of the brand configurations.