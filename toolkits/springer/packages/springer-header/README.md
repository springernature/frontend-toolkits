# Springer Header

Publisher level header for Springer products.

## Usage

```html
<header class="c-header">
    <div class="c-header__container">
        <div class="c-header__brand">
            <a href="#" itemprop="url">
                <img alt="Springer" itemprop="logo" width="112" height="30" role="img" src="path/to/logo.svg">
            </a>
        </div>
        <div class="c-header__navigation">
            <!-- #not mandatory -->
            <a href="#"
               class="c-header__link c-header__link--search">
				<span class="u-display-flex u-flex-align-center">
					Search
					<svg class="u-icon u-ml-4" width="22" height="22" aria-hidden="true" focusable="false">
						<use xlink:href="{{iconUrl}}#search"></use>
					</svg>
				</span>
            </a>
            <!-- /not mandatory -->
            <nav>
                <ul class="c-header__menu">
                    <li class="c-header__item">
                        <a class="c-header__link" href="#">Menu item 1</a>
                    </li>
                    <li class="c-header__item">
                        <a class="c-header__link" href="#" data-test="login-link">Menu item 2</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>
```

## Dropdown menu

If you want functionality where the menu should be a dropdown on small screens, then you need to create the dropdown from your app.
The [springer-dropdown](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/springer/packages/springer-dropdown) has a helper called `createDropdown` that will create the dropdown HTML and instance.

Example usage in an app in conjunction with the springer-dropdown:

```html
<!-- ... -->
<nav>
    <ul class="c-header__menu" data-header-menu>
        <li class="c-header__item">
            <a class="c-header__link" href="#">Menu item 1</a>
        </li>
        <li class="c-header__item">
            <a class="c-header__link" href="#" data-test="login-link">Menu item 2</a>
        </li>
    </ul>
</nav>
<!-- ... -->
```

```javascript
const headerMenu = document.querySelector('[data-header-menu]');

if (!headerMenu) {
    return;
}

const items = headerMenu.querySelectorAll('li');
const links = makeArray(items).map(item => item.querySelector('a'));

const dropdownEl = createDropdown('Menu', links, {DROPDOWN_CLASS: 'u-hide-at-md'});
headerMenu.parentNode.insertBefore(dropdownEl, headerMenu.nextSibling);
```
