# Author List

A styled list of comma separated authors with the final author being preceded by an " & ".
The separation strings `, `, ` & ` and ` ... ` are set in the CSS using pseudo-elements.

## Usage

```html
<ul class="c-author-list">
    <li class="c-author-list__item">Author 1</li>
    <li class="c-author-list__item">Author 2</li>
    <li class="c-author-list__item">Author 3</li>
    <li class="c-author-list__item">Author 4</li>
    <li class="c-author-list__item">Author 5</li>
</ul>
```

**Example output**
`Author 1, Author 2, Author 3, Author 4 & Author 5`

### Modifiers

**Compact**

Sets a smaller `font-size` and `line-height` on the list.

```html
<ul class="c-author-list c-author-list--compact">...</ul>
```

**Truncated**

Overrides the default ` & ` with a `...` before the final item in the list.

```html
<ul class="c-author-list c-author-list--truncated">...</ul>
```

**Example output**
`Author 1, Author 2 ... Author 5`

### Heads Up!

It is down to your application to render the correct authors for the `--truncated` option to make sense.

For example:

```kotlin
val isTruncated = fullContributorList.size > 3
val contributors = if (isTruncated) { fullContributorList.take(2) +  fullContributorList.last() } else fullContributorList
```

```handlebars
<ul class="c-author-list{{#if isTruncated}} c-author-list--truncated{{/if}}>...</ul> 
```

