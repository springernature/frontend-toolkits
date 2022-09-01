# Design Tokens

## What Are Design Tokens


> Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.
>
> Salesforce, Lightning Design System

The Design Tokens are generated from several `.json` files which are (currently) compiled into various Sass files are needed.
## Running The Design Tokens Workflow

To get this up and running you will need to be in the root of this repo and have ran `npm install`.

### Generate Design Tokens

To generate the tokens run `npm run tokens:generate`.

This will run the `tokens:clean` script and then take the `.json` files in the `design-tokens` folder and generate the relevant `.scss` files in a folder called `00-tokens` in the `brand-context` folder. It will also generate an `index.scss` file based on the created files inside the `00-tokens` folders.

### Clearning Generated Design Tokens

To clean the generated design tokens `.scss` files that are created in the `00-tokens` folder you can run `npm run tokens:clean`. This will remove the `00-tokens` folder and its contents. This script is part of the `npm run tokens:generate` script.

---
## Design Tokens Naming Conventions
### Literal Design Tokens
These are the ‘locked’ tokens, that hold a value that should not change. These are primarily used to to create the Alias Design Tokens that can be used in developing components.
The Design values we have integrated into a Design Tokens workflow are:
#### Colour
The `color` Design Tokens will be used for any Alias Design Token defined.
As the current colour palettes used are relatively small we will name most of the colours. For the grayscale colours we will apply a numerical scale to go from white to black, `100` to `900`. This naming convention allows for additional grayscale colours to be added over time if needed.
There are four categories for the colour palettes used across Springer Nature:
1. UI - These are used for the foreground and background colours of the web page. The page background, the header background, the footer background. As well as interactive states of text links and buttons.
2. grayscales - These are used for border colours, text colours, and backgrounds.
3. Information - These are used for different states like the error state of a form input, or the focus state of a text link.
4. Brand Specific Colours - These are specific to the various brands across Springer Nature and could be used for text, border, background colour etc.
##### Example
```
{
  "color": {
		"ui": {
			"universal-dark-blue": {
				"value": "#01324b"
			}
		},
		"grayscale": {
			"100": {
				"name": "grayscale-100",
				"value": "#ffffff"
  		},
			"200": {
				"name": "grayscale-200",
				"value": "#f8f8f8"
			}
		}
  }
}
```
#### Typography
There are several Literal Design Tokens for typography. They include:
- the `font-family` which defines the preferred typeface to be used, and for the web a group of fallbacks.
- the `font-size`. These will be defined in using the `rem` unit and will also make use of a numerical scale where `400` is the same as `1rem` or `16px`. Again, this helps to add font sizes to the scale if needed in the future.
- the `font-weight`. These will be defined using the existing numeric keyword values
- the `line-height`. These will be defined with unitless values and will use descriptive names like ‘tight’ and ‘loose’.
- the `letter-spacing`. These will be defined using the `rem` unit and will use a numerical scale. As `letter-spacing` is tiny in comparison to `font-size` we use a similar scale but with `10`s prefixed with a `0`.
##### Example
```
{
	"font": {
		"family": {
			"sans": {
            "value": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif"
      },
		"size": {
			"600": {
  			"value": "1.5rem"
			}
		},
		"weight": {
			"700": {
				"value": "700"
			}
		},
		"line-height": {
			"tight": {
				"value": "1.25"
			}
		},
		"letter-spacing": {
			"080": {
				"value": "0.2rem"
			}
		}
  }
}
```
#### Space
The spacing design tokens are to be used to manage the `margin`, `padding`, and `gap` of a component or layout.
They are defined using the `rem` unit and use a numerical scale like the `font-size` tokens where the number `400` would be equal to `1rem` (16px).
##### Example
```
{
  "spacing": {
	  "0" : {
      "value": "0rem",
      "comment": "no spacing, zero."
    },
    "100" : {
      "value": ".25rem",
      "comment": ".25rem, 4px."
    },
    "200" : {
      "value": ".5rem",
      "comment": ".5rem, 8px."
    }
  }
}
```
#### Breakpoints
The breakpoint values are defined using the `em` CSS unit. They are used to manage changes in the design of the web page or component depending on the screen size. The naming convention used is based on t-shirt sizing.

```
{
	"breakpoints": {
		"xs": {
			"value": "320px",
			"comment": "mobile"
		},
		"md": {
			"value": "768px",
			"comment": "tablet"
		},
		"lg": {
			"value": "1024px",
			"comment": "small desktop"
		}
	}
}
```

#todo
- These are also used to generate the styling utility classes
- These will be expanded upon with values for `z-index`, `box-shadow`, `border` properties (and more).
- - -
### Alias Design Tokens
Alias Design Tokens are ‘locked’ tokens that hold a literal design tokens, and not a value.
#todo
- This is part of 'phase 2' of the Design Tokens Epic

### Component Design Tokens
Component Design Tokens are 'locked' tokens that hold a Alias design token, and not a literal token or value.
#todo
- This is part of 'phase 3' of the Design Tokens Epic

---
## Sketch File

Literal and Alias Design Tokens taken from here - https://www.sketch.com/s/fa9c2fc9-a179-43f0-b21e-9562c9c17c0c/a/g0ZP71z
