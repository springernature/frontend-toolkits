# Springer media component

A media component catering for an image, clickable title and body text. Styles have also been included to add a play button for things like videos.

![Examples of media component on desktop and mobile](https://user-images.githubusercontent.com/5796370/62363173-a72a8380-b516-11e9-97cb-47289d1d16a0.png)

## Example

#### HTML
```html
<ul>
    <li class="c-media">
        <img src="some src" class="c-media__figure" alt="some alt text">
        <div class="c-media__body">
            <h4 class="c-media__title u-text-lg">
                <a href="some href">Title</a>
            </h4>
            <p>Text body</p>
        </div>
    </li>
    <li class="c-media">
        <div class="c-media__body">
            <h4 class="c-media__title u-text-lg">
                <a href="some href">Title</a>
            </h4>
            <p>Text body</p>
        </div>
        <img src="some src" class="c-media__figure" alt="some alt text">
    </li>
    <li class="c-media">
        <div class="c-media__body">
            <h4 class="c-media__title u-text-lg">
                <a href="some href">Title</a>
            </h4>
            <p>Text body</p>
        </div>
    </li>
</ul>
```
