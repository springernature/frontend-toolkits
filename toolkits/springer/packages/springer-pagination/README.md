# Springer pagination

A component for the controls of pagination.

## Example

#### HTML
```html
<nav>
    <ul class="c-pagination">
        <li class="c-pagination__item">
            <span class="c-pagination__link c-pagination__link--disabled">
                <svg class="c-icon u-margin-right-xs c-pagination__icon" aria-hidden="true">
                    <use xlink:href="#icon-springer-arrow-left"></use>
                </svg>
            </span>
        </li>
        <li class="c-pagination__item">
            <span class="c-pagination__link c-pagination__link--active">1</span>
        </li>
        <li class="c-pagination__item">
            <a href="/news?type=articles&amp;pageSize=1&amp;page=2" class="c-pagination__link">
                2
            </a>
        </li>
        <li class="c-pagination__item">
            <a href="/news?type=articles&amp;pageSize=1&amp;page=3" class="c-pagination__link">
                3
            </a>
        </li>
        <li class="c-pagination__item">
            <span class="c-pagination__link c-pagination__link--disabled c-pagination__link--ellipsis">…</span>
        </li>
        <li class="c-pagination__item">
            <a href="/news?type=articles&amp;pageSize=1&amp;page=22" class="c-pagination__link">
                22
            </a>
        </li>
        <li class="c-pagination__item">
            <a href="/news?type=articles&amp;pageSize=1&amp;page=2" rel="next" class="c-pagination__link">
                <svg class="c-icon u-margin-left-xs c-pagination__icon c-pagination__icon--active" aria-hidden="true">
                    <use xlink:href="#icon-springer-arrow-right"></use>
                </svg>
            </a>
        </li>
    </ul>
</nav>
```
