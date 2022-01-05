# Springer listings

Display of scannable content typically within a non-curated list, for example, entries in a search results list.

Optional image shrinks besides the title and text as the viewport becomes smaller.

## Usage

# Usage

Import the Sass:

```scss
@import '../node_modules/@springernature/springer-listing/scss/10-settings/listings';
@import '../node_modules/@springernature/springer-listing/scss/50-components/listings';
```

Then compile the template located in the `./view` folder whenever the component is needed. See the `./demo/context.json` to see examples of the expected data. Note that the listings themselves are supplied as an array on the `listings` property. This allows for applying various options (like `level` in the below example) to every listing.

```json
{
    "level": "4",
    "listings": [
            ...
        ]
    }
}
```

### Variants

### Level

Depending on the level of the heading that introduces the listings section, the heading level of each listing’s `title` might need to be changed. For example, if the introductory heading for the listings section is an `<h3>`, the `level` should be `"4"`:

```json
{
    "level": "4",
    "listings": [
            ...
        ]
    }
}
```

The heading level is changed for screen readers only, using `aria-level`. The title/heading’s style (font size) remains unaffected.

### Authors

Authors of the listed publication can be supplied as an array. Comma separation is handled automatically.

```json
{
    "permalink": "/path/to/permalink",
	"title": "Excellent cyclic performance of electrolytic MnO2 in Li/MnO2 rechargeable batteries",
    "authors": [
        "Zhen Cao",
        "Qizhen Xiao",
        "Gangtie Lie",
        "Zhaohui Li"
    ]
    ...
}
```

### Metadata

Metadata is supplied via the `meta` property. This constitutes an array of simple strings.

```json
{
    "permalink": "/path/to/permalink",
	"title": "Excellent cyclic performance of electrolytic MnO2 in Li/MnO2 rechargeable batteries",
    "meta": [
        "Original Paper",
        "4 October 2019"
    ]
    ...
}
```

### Options

Options constitute different ways to consume the content. Each option is an object with `label` and `url` properties. The `optionIcon` property is the path for the (chevron) icon for each option. This is placed on the parent context.

```json
{
    "optionIcon": "path/to/option/ion#icon-id",
    "listings": {
        "permalink": "/path/to/permalink",
        "title": "Excellent cyclic performance of electrolytic MnO2 in Li/MnO2 rechargeable batteries",
        "options": [
            {
                "label": "Full text",
                "url": "/path/to/full/text"
            },
            {
                "label": "PDF",
                "url": "/path/to/pdf"
            }
            ...
        ]
    }
}
```
