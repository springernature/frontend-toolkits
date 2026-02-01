# Global loader animation

Show a loading animation for async stuff, like requests etc

```scss

// Include this with your other components
@use '@springernature/global-loader-animation/scss/10-settings/default';
@use '@springernature/global-loader-animation/scss/50-components/loader';
```

### Basic usage

```js
import CssLoader from '@springernature/global-loader-animation/js';

const loader = new CssLoader();

// Show loader animation
loader.add();

// Remove loader animation
loader.remove();

```
