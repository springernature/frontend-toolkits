# Springer Media

[![NPM version][badge-npm]][info-npm]

The Springer Media component is derived from the media object pattern we see all over the web. [Named by Nicole Sullivan](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/). 
It describes refers to a two-column box with an image on one side and descriptive content on the other.

It consists of:
- a **figure**(optional) that is or contains the media element
- a **body** that contains a heading(optional), often clickable, and some text

Note: Styles have also been included to add a play button for things like videos.

## When to use this component

Use the Springer Media component to display a text block accompanied by an illustration to be positioned at its sides or stacked.

## Installation

To use the Media component, enter the following command in your Terminal:

```
npm install @springernature/springer-media
```

Import the installed Sass:

```scss
@import '@springernature/springer-media/scss/10-settings/media';
@import '@springernature/springer-media/scss/50-components/media';

@import '@springernature/brand-context/default/scss/60-utilities/hiding.scss';
```
## How it works
### Stacked

It is possible to have the figure and text shown as one column. In order to do that add 
`c-media--stagged` to the element carrying the `c-media` class.

### Figure placement

The figure can be displayed on the left or the right of the text. 

To display it on the left, the element carrying the `c-media__figure` class should be positioned right before the element carrying 
the`c-media__body` class.

To display it on the right, the element carrying the `c-media__figure` class should be positioned right after the element carrying 
the`c-media__body` class.

When the component is stacked, left figure is shown above the text and right figure is shown below.

To display the **text only**, omit the element carrying the `c-media__figure` class.

### Play icon

The component provides an option to show a play icon (triangle) on the figure, which can be used to link to video material.
In order to do that, mark up the figure as shown in the code snippet below:

```
<div class="c-media__figure">
	<img src="{{src}}" alt="{{alt}}">
		<div class="c-media__play">
			<span class="u-visually-hidden">Video</span>
		</div>
</div>
```

## Template

Find a configurable template in the [`view` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/springer/packages/springer-media/view). 

You can see an example in the [`demo` folder](https://github.com/springernature/frontend-toolkits/tree/master/toolkits/springer/packages/springer-media/demo).

## Help improve this page

If you’ve got a question, idea or suggestion about how to improve this component or guidance, post in the [#design-systems Slack channel](https://springernature.slack.com/archives/C75DHBTBP).

[info-npm]: https://www.npmjs.com/package/@springernature/springer-media
[badge-npm]: https://img.shields.io/npm/v/@springernature/springer-media.svg
