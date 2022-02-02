# Springer media component

A media component catering for an image, clickable title, and body text. Styles have also been included to add a play button for things like videos.

## Example

#### HTML
```html
<ul>
	<!-- Image left -->
    <li class="c-media">
        <img src="some src" class="c-media__figure" alt="some alt text">
        <div class="c-media__body">
            <h4 class="c-media__title">
                <a href="some href">Title</a>
            </h4>
            <p>Text body</p>
        </div>
    </li>

	<!-- Image right -->
    <li class="c-media">
        <div class="c-media__body">
            <h4 class="c-media__title">
                <a href="some href">Title</a>
            </h4>
            <p>Text body</p>
        </div>
        <img src="some src" class="c-media__figure" alt="some alt text">
    </li>

	<!-- No image -->
    <li class="c-media">
        <div class="c-media__body">
            <h4 class="c-media__title">
                <a href="some href">Title</a>
            </h4>
            <p>Text body</p>
        </div>
    </li>
</ul>
```
