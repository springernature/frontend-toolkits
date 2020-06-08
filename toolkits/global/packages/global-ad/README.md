# Global Ad

Catering for ad slots, specifically:
- leaderboard ad slots (970x90, 728x90)
- mpu ad slots (300x250)
- skyscraper ad slots (160x600)

Minimum height set for leaderboard and mpu slots to prevent reflow of layout.

## Branding

The `global-ad` component currently uses the `DEFAULT` brand only.

```scss
// Inlcude this with your settings
@import '@springernature/global-ad/scss/10-settings/default';

// Incude this with your other components
@import '@springernature/global-ad/scss/50-components/ad';
```

## Usage

#### HTML
```html
<!--leaderboard-->
<div class="c-ad c-ad--728x90">
    <div class="c-ad__inner">
        <p class="c-ad__label">Advertisement</p>
        <!--ad slot content here-->
    </div>
</div>

<div class="c-ad c-ad--970x90">
    <div class="c-ad__inner">
        <p class="c-ad__label">Advertisement</p>
        <!--ad slot content here-->
    </div>
</div>

<!--mpu-->
<div class="c-ad c-ad--300x250">
    <div class="c-ad__inner">
        <p class="c-ad__label">Advertisement</p>
        <!--ad slot content here-->
    </div>
</div>

<!--skyscraper-->
<div class="c-ad c-ad--160x600">
    <div class="c-ad__inner">
        <p class="c-ad__label">Advertisement</p>
        <!--ad slot content here-->
    </div>
</div>
```
