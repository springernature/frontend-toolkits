# Nature Headings

Nature branded headings.

## CSS

Include the SCSS in your application

```scss
// Include this with your other components
@import '@springernature/nature-headings/scss/10-settings/headings';
@import '@springernature/nature-headings/scss/30-mixins/headings';
@import '@springernature/nature-headings/scss/50-components/headings';
```

## Example usage

### Without an icon

```html
<h2 class="c-slice-heading">News &amp; Comment</h2>
```

### With link and an icon

```html
<div class="c-slice-heading">
    <h2>
        <a href="/nature/collections" class="u-link-inherit u-display-inline-flex u-align-items-center">
            Collections
            <svg class="u-icon u-mt-4 u-ml-4" aria-hidden="true" focusable="false" height="20" width="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m4.08573416 5.70052374 2.48162731-2.4816273c.39282216-.39282216 1.02197315-.40056173 1.40306523-.01946965.39113012.39113012.3914806 1.02492687-.00014045 1.41654791l-4.17620791 4.17620792c-.39120769.39120768-1.02508144.39160691-1.41671995-.0000316l-4.17639421-4.1763942c-.39122513-.39122514-.39767006-1.01908149-.01657797-1.40017357.39113012-.39113012 1.02337105-.3930364 1.41951348.00310603l2.48183447 2.48183446.99770587 1.01367533z" transform="matrix(0 -1 1 0 2.081146 11.085734)"></path></svg>
        </a>
    </h2>
</div>
```