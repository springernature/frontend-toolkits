## Icons

Recommendation of using icons is the same as in the 
[Icons section of the default brand context](../default/README.md#icons)

In case you are generating SVG sprites in combination with
[SVGO](https://github.com/svg/svgo), be wary of the `cleanupIDs` configuration
which is enabled by default. The configuration minifies IDs which may lead to ID
duplication in the HTML document. This duplication fails W3C
validation and violates WCAG 2.1 [SC 4.1.1
Parsing](https://www.w3.org/TR/WCAG21/#parsing) (see [Techniques & Failure
F77](https://www.w3.org/WAI/WCAG21/Techniques/failures/F77.html) to understand
why).
A work around is the set this `cleanupIDs` configuration as below:

```javascript
cleanupIDs: {
    prefix: {
        toString() {
            return `${Math.random().toString(36).substr(2, 9)}`;
        }
    }
}
```
