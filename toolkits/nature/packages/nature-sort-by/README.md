# Nature Sort By

[![NPM version][badge-npm]][info-npm]

A component for use on Nature product pages that allows a user to sort a list of content.

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

The component's HTML should be inserted inside of an HTML form in your application. See below [Template section](#template) for an example.

## Configuration

The Sort By component passes data to a backend to tell it how a list of content should be sorted. This is done using a standard form submission and requires you to have a backend to receive and that process the form data. Edit the values of the `name` and `value` html attributes on the radio inputs to define data appropriate for your backend logic.

## Template

Find a configurable template in the [`view` folder](./view/sort-by.hbs). You can see an example usage in the [`demo` folder](./demo/dist/index.html). 

[info-npm]: https://www.npmjs.com/package/@springernature/nature-sort-by
[badge-npm]: https://img.shields.io/npm/v/@springernature/nature-sort-by.svg
