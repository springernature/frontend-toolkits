## Fonts

We are using Merriweather as a variable font for both `serif` and `sans-serif`.

Browsers that support variable fonts also support the `woff2` format. We therefore
do not need to serve other formats.

Browsers that do not support variable fonts will fallback to the system fonts
specified in the `$context--font-family-serif` and `$context--font-family-sans`
SASS variable, respectively `'Merriweather'` and `'Merriweather Sans'`.

So far our `Merriweather` font instance only includes the [Weight variation
axis](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#weight).  
At the time of writing, `Merriweather` supports the additional [Width
variation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#width) and [Optical Size variation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#optical_size) as well.  
If at any point in the future there is a need for these variations, you will
need to start over the font generation process as described below, leaving in
the variations you need. **Beware** though, the font file weight will increase
with the amount of variations you add.
At the time of writing `Merriweather Sans` only supports the [Weight variation
axis](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#weight).  
It is worth noting that we also optimised the available `font-weight` range at
the font generation step to only span from `300` to `700`.  
If at any point in the future there is a need for a different range, you will
need to start over the font generation process as described below, specifying
the new range. **Beware** though, the font file weight will increase the broader
the range is.

### Font generation process

#### Original fonts download

- [Download Merriweather](https://github.com/SorkinType/Merriweather/blob/master/fonts/variable/Merriweather%5Bopsz%2Cwdth%2Cwght%5D.ttf)
- [Download Merriweather Sans](https://github.com/SorkinType/Merriweather-Sans/blob/master/fonts/variable/MerriweatherSans%5Bwght%5D.ttf)

#### Tools needed

- fonttools ([Install fonttools](https://pypi.org/project/fonttools/))
- varLib instancer ([varLib instancer documentation](https://fonttools.readthedocs.io/en/latest/varLib/instancer.html))
- woff2 library ([How To Convert Variable TTF Font Files to WOFF2](https://henry.codes/writing/how-to-convert-variable-ttf-font-files-to-woff2/))

#### Generating Merriweather-Variable.woff2

In the following commands, it is assumed that CLI tools are included in your
`PATH`, if not you should use the absolute path to their binaries.

1. Download Merriweather font under the name of `Merriweather-Variable.ttf`
2. In the Terminal navigate to the folder you have just downloaded the font to
3. Run `fonttools varLib.instancer ./Merriweather-Variable.ttf wdth=drop opsz=drop wght=300:700`
4. Run `woff2_compress ./Merriweather-Variable-partial.ttf`
5. Run `mv ./Merriweather-Variable-partial.woff2 ./Merriweather-Variable.woff2`
6. Copy `Merriweather-Variable.woff2` to your app's font folder

#### Generating MerriweatherSans-Variable.woff2

In the below commands, it is considered the CLI tools are in the `PATH`, if not
you should use the absolute path to their binaries.

1. Download Merriweather Sans font under the name of `MerriweatherSans-Variable.ttf`
2. In the Terminal navigate to the folder you have just downloaded the font to
3. Run `fonttools varLib.instancer ./MerriweatherSans-Variable.ttf wght=300:700`
4. Run `woff2_compress ./MerriweatherSans-Variable-partial.ttf`
5. Run `mv ./MerriweatherSans-Variable-partial.woff2 ./MerriweatherSans-Variable.woff2`
6. Copy `MerriweatherSans-Variable.woff2` to your app's font folder

#### Declaring the fonts in the CSS

```javascript
@font-face {
	font-family: 'Merriweather';
	src: url('/PUBLIC-PATH-TO-FONTS-FOLDER/Merriweather-Variable.woff2') format('woff2 supports variations'),
	url('/PUBLIC-PATH-TO-FONTS-FOLDER/Merriweather-Variable.woff2') format('woff2-variations');
	font-weight: 400 700;
	font-display: swap;
}

@font-face {
	font-family: 'Merriweather Sans';
	src: url('/PUBLIC-PATH-TO-FONTS-FOLDER/MerriweatherSans-Variable.woff2') format('woff2 supports variations'),
	url('/PUBLIC-PATH-TO-FONTS-FOLDER/MerriweatherSans-Variable.woff2') format('woff2-variations');
	font-weight: 400 700;
	font-display: swap;
}
```


## Icons

Recommendation of using icons is the same as in the 
[Icons section of the default brand context](../default/README.md#icons)

In case you are generating SVG sprites in combination with
[SVGO](https://github.com/svg/svgo), be wary of the `cleanupIDs` configuration
which is enabled by default. The configuration minifies IDs which may lead to ID
duplication in the HTML document. This duplication fails W3C
validation and violates WCAG 2.1 [SC 4.1.1
Parsing](https://www.w3.org/TR/WCAG21/#parsing) (see [Techniques & Failure
F77](https://www.w3.org/WAI/WCAG21/Techniques/failures/F77.html) to understand
why).
A work around is the set this `cleanupIDs` configuration as below:

```javascript
cleanupIDs: {
    prefix: {
        toString() {
            return `${Math.random().toString(36).substr(2, 9)}`;
        }
    }
}
```
