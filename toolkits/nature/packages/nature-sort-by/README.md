# Nature Sort By

[![NPM version][badge-npm]][info-npm]

A sort by dropdown for use on Nature product pages that contain a sortable list of content such as search results pages.

## Installation

To use the Sort By component, enter the following command in your Terminal:

```
npm install @springernature/nature-sort-by
```

## Usage

Import the js and scss as follows:

```js
import {sortBy} from '@springernature/nature-sort-by/js/sort-by';

sortBy();
```

```scss
@import '@springernature/nature-sort-by/scss/10-settings/sort-by';
@import '@springernature/nature-sort-by/scss/50-components/sort-by';

@import '@springernature/brand-context/default/scss/60-utilities/flex.scss';
@import '@springernature/brand-context/default/scss/60-utilities/hiding.scss';
@import '@springernature/brand-context/default/scss/60-utilities/spacing.scss';

```

> **NOTE** The component require the use of the utility classes shown above

## Configuration

To configure the component the following html attributes will need to be set:

| Name                    | Description                                                                                 | 
|------------------------|---------------------------------------------------------------------------------------------|
| data-sort-by-trigger   | This should be set on the html element that is clicked in order to open the dropdown menu   |
| data-sort-by-target    | This should be set on the containing html element of the sort by dropdown menu              |
| data-sort-by-radio     | This should be set on each list item within the sort by dropdown menu                       |
| <input value=""        | The value attribute for each radio input should be set with the corresponding url parameter value for page content sorting. For example `value="date_desc"` generates the following url parameter upon page reload: `?ORDER=date_desc`  |

This component uses Global Expander. This means you should be aware of the following:
1. Global Expander will replace the href of the trigger with `javascript:;`. This allows you to put a hash link in for progressive enhancements purposes.
2. You can add the classname `u-js-hide` to the target on page render. Global Expander will remove this when the menu is opened. 
3. Global Expander will add the classname `is-open` to the trigger and `has-tethered` to the target when the menu has been opened. The component's styling utilises these.

## Template

Find a configurable template in the [`view` folder](./view/sort-by.hbs). You can see an example usage in the `demo` folder.

[info-npm]: https://www.npmjs.com/package/@springernature/nature-sort-by
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-sort-by.svg