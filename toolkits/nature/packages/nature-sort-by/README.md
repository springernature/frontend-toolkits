# Nature Sort By

[![NPM version][badge-npm]][info-npm]

The Nature Sort by component lets users change the order of a list of content items. For example, to sort search results by date or relevance.

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
```

Insert the component's HTML inside an HTML form in your application. See an example [template](#template) below.

## Template

Find a configurable template in the [Sort by's `view` folder](https://github.com/springernature/frontend-toolkits/blob/master/toolkits/nature/packages/nature-sort-by/view/sort-by.hbs). 

See an example usage in the [Sort by's `demo` folder](https://github.com/springernature/frontend-toolkits/blob/master/toolkits/nature/packages/nature-sort-by/demo/dist/index.html).

[info-npm]: https://www.npmjs.com/package/@springernature/nature-sort-by
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-sort-by.svg


## Configuration

The Sort By component passes data to a backend to tell it how a list of content should be sorted. This is done using a standard form submission and requires you to have a backend to receive and that process the form data. Edit the values of the `name` and `value` html attributes on the radio inputs to define data appropriate for your backend logic.