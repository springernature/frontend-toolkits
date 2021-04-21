# Global Ad

Catering for ad slots, specifically:
- leaderboard ad slots (970x90, 728x90)
- mpu ad slots (300x250)
- skyscraper ad slots (160x600)

Minimum height set for leaderboard and mpu slots to prevent reflow of layout.

## Branding

To include `global-ad` in your application, you need to choose **ONE** brand from those available. The `DEFAULT` brand is included in all other brands, and any settings that are not configured will fall back to default.

```scss
// Pick ONE of the brands below to include
@import '@springernature/global-ad/scss/10-settings/default';
@import '@springernature/global-ad/scss/10-settings/nature';

// Include this with your other components
@import '@springernature/global-ad/scss/50-components/ad';
```

## Usage

#### HTML
```html
<!--leaderboard-->
<aside class="c-ad c-ad--728x90">
    <div class="c-ad__inner">
        <p class="c-ad__label">Advertisement</p>
        <!--ad slot content here-->
    </div>
</aside>

<aside class="c-ad c-ad--970x90">
    <div class="c-ad__inner">
        <p class="c-ad__label">Advertisement</p>
        <!--ad slot content here-->
    </div>
</aside>

<!--mpu-->
<aside class="c-ad c-ad--300x250">
    <div class="c-ad__inner">
        <p class="c-ad__label">Advertisement</p>
        <!--ad slot content here-->
    </div>
</aside>

<!--skyscraper-->
<aside class="c-ad c-ad--160x600">
    <div class="c-ad__inner">
        <p class="c-ad__label">Advertisement</p>
        <!--ad slot content here-->
    </div>
</aside>
```
