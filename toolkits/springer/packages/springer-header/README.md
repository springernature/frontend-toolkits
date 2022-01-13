# Springer Header

Publisher level header for Springer products.

## Usage

Import and compile the Sass. You need to ensure you are importing some utility stylesheets.

```scss
@import '../node_modules/@springernature/brand-context/default/scss/60-utilities/icons.scss';
@import '../node_modules/@springernature/brand-context/default/scss/60-utilities/buttons.scss';
@import '../node_modules/@springernature/brand-context/default/scss/60-utilities/flex.scss';
@import '../node_modules/@springernature/brand-context/default/scss/60-utilities/spacing.scss';
@import '../node_modules/@springernature/springer-header/scss/10-settings/header';
@import '../node_modules/@springernature/springer-header/scss/50-components/header';
```

Then compile the template located in the `./view` folder whenever the component is needed. See the `./demo/context.json` to see an example of the expected data.

## Variants

### Promoted menu

The promoted menu is the menu on the top left of the header. Each menu item can have an optional icon assigned.

```json
"promotedMenu": [
    {
        "label": "SpringerLink shop",
        "href": "/path/to/1",
        "iconUrl": null
    }
]
```

### Search

To activate search, include a `search` property on the data. 

```json
"search": {
    "action": "/search",
    "inputLabel": "Search this site",
    "inputName": "search",
    "iconUrl": "../../img/search.svg#i-search",
    "springerLinkUrl": "#",
    "springerLinkText": "Search our products and science on SpringerLink"
}
```

The search box is revealed and focused when the search link in the promoted menu is pressed. This link is included automatically. 

#### Enhancement

By default, this click-to-reveal functionality works without JavaScript and using the `:target` CSS pseudo-class. However, it is recommended you enhance with JavaScript and focus the search input (rather than the search form) when the search box is revealed. 

The `./demo/main.js` file consists of a basic script demonstrating how you might go about this enhancement. It makes use of the `c-header__search-form--visible` class to reveal the search form.
