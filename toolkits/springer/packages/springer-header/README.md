# Springer Header

Publisher level header for Springer products.

## Usage

Import and compile the Sass:

```scss
@import '../node_modules/@springernature/springer-header/scss/10-settings/header';
@import '../node_modules/@springernature/springer-header/scss/50-components/header';
```

Use `/demo/index.hbs` file as your template and `/demo/context.json` as the schema for the template data: 

```html
<header class="c-header">
	<div class="c-header__container">
		{{#with logo}}
		<div class="c-header__brand">
			<a href="{{href}}" itemprop="url">
				<img alt="{{alt}}" itemprop="logo" width="112" height="30" role="img" src="{{srcUrl}}">
			</a>
		</div>
		{{/with}}
		{{#if promotedMenu}}
		<ul class="c-header__menu">
			{{#each promotedMenu}}
			<li class="c-header__item">
				<a href="{{href}}" class="c-header__link">
					<span class="u-display-flex u-align-items-center">
						{{label}}
						{{#if iconUrl}}
						<svg class="u-icon u-ml-4" width="22" height="22" aria-hidden="true" focusable="false">
							<use xlink:href="{{iconUrl}}"></use>
						</svg>
						{{/if}}
					</span>
				</a>
			</li>
			{{/each}}
		</ul>
		{{/if}}
	</div>
	{{#if navMenu}}
	<nav class="c-header__nav">
		<ul class="c-header__nav-menu">
			{{#each navMenu}}
			<li class="c-header__item">
				<a href="{{href}}" class="c-header__link c-header__link--nav">{{label}}</a>
			</li>
			{{/each}}
		</ul>
	</nav>
	{{/if}}
</header>
```
