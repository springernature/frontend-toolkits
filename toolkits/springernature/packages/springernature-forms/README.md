# Springer Nature forms

Springer Nature branded styles for text, checkbox, radio button, textarea and
select inputs.

## Usage

### CSS

Import the SCSS you need in your application

```scss
// Include this with your settings
@import '@springernature/springernature-forms/scss/10-settings/forms';

// Include this with your mixins
@import '@springernature/springernature-forms/scss/30-mixins/forms';

// Include this with your base
@import '@springernature/springernature-forms/scss/40-base/forms';

// Include this with your other components
@import '@springernature/springernature-forms/scss/50-components/forms';
@import '@springernature/springernature-forms/scss/50-components/errors';

// Include this with your other utilities, since icons and buttons are needed.
@import '@springernature/brand-context/default/scss/60-utilities/icons';
@import '@springernature/brand-context/default/scss/60-utilities/buttons';
```

## Components

- [Text input](#text-input)
- [Text area](#text-area)
- [Hint text](#hint-text)
- [Error hint](#error-hint)
- [File upload](#file-upload)
- [Radio buttons](#radio-buttons)
- [Checkboxes](#checkboxes)
- [Form headings](#form-headings)
- [Error summary](#error-summary)
- [Select field](#select-field)
- [Form buttons](#form-buttons)

### Text input

For when you need users to enter no longer than a single line of text, for
instance their name, phone number...

```html
<div class="c-forms__field">
	<label for="firstName">
		<span class="c-forms__label-text">First name</span>
	</label>
	<input class="c-forms__input" type="text" id="firstName" name="firstName" value="" />
</div>
```

### Text area

For when you need users to enter text longer than a single line, for instance
their feedback...

```html
<div class="c-forms__field">
	<label for="feedback">
		<span class="c-forms__label-text">Feedback</span>
	</label>
	<textarea class="c-forms__input" name="feedback" id="feedback" rows="5"></textarea>
</div>
```

### Hint text

Hint text is meant to help the majority of users, providing guidance about the
format of the related input, where they can find the requested information...
The aim is that they have all the keys necessary to not fail the validation on
the related input.

```html
<div class="c-forms__field">
	<label for="password">
		<span class="c-forms__label-text">Password</span>
		<span class="c-forms__hint">Hint: 8 characters or more</span>
	</label>
	<input class="c-forms__input" type="password" name="password" id="password" value="" />
</div>
```

### Error hint

Error hint is meant to signal users something is incorrect their input. For
instance it can be empty or of an incorrect format.

```html
<div class="c-forms__field">
	<label for="lastName">
		<span class="c-forms__label-text">Last name</span>
		<span class="c-forms__field-error" data-component="error-hint">
		<svg class="u-icon" width="18" height="18" aria-hidden="true" focusable="false"><use xlink:href="#icon-warning"></use></svg>
		<span>Enter the last name</span>
	</span>
	</label>
	<input class="c-forms__input" type="text" id="lastName" name="lastName" value="" />
</div>
```

### File upload

Let users select and upload a file.

```html
<div class="c-forms__field">
	<label for="profilePicture">
		<span class="c-forms__label-text">Profile picture (optional)</span>
		<span class="c-forms__hint">Hint: Must be a GIF, JPG or PNG file and no larger than 1MB.</span>
	</label>
	<input class="c-forms__input c-forms__input--file" type="file" id="profilePicture" name="profilePicture" accept=".gif,.jpg,.jpeg,.png">
</div>
```

### Radio buttons

Let users select **only one** option from a short list of options.

```html
<div class="c-forms__field">
	<fieldset>
		<legend class="c-forms__label-text">
			<span>Do you already have an account?</span>
		</legend>
		<div class="c-forms__radio">
			<input type="radio" name="have-account" value="mr" id="have-account-yes">
			<label for="have-account-yes">Yes</label>
		</div>
		<div class="c-forms__radio">
			<input type="radio" name="have-account" value="mrs" id="have-acount-no">
			<label for="have-account-no">No</label>
		</div>
	</fieldset>
</div>
```

### Checkboxes

Let users select **one or more** options from a short list of options.

```html
<div class="c-forms__field">
	<div class="c-forms__checkbox">
		<input type="checkbox" name="termsAndConditions" value="" id="termsAndConditions">
		<label for="termsAndConditions">I agree to <a href="#">the terms and conditions</a></label>
	</div>
</div>
```

### Form headings

For when the form needs a bit of structure, you can user form headings and
sub headings.

```html
<h3 class="c-forms__heading">Create your account</h3>
	<div class="c-forms__section">
		<h4 class="c-forms__subheading">Profile information</h4>
		<div class="c-forms__field">
			<label for="fullName">
				<span class="c-forms__label-text">Full name</span>
			</label>
			<input class="c-forms__input" type="text" id="fullName" name="fullName" value="" />
		</div>
	</div>
</div>
```

### Error summary

Use this component at the top of a page to summarise any errors a user has made.

**Note:** When a user makes an error, you must show both an error summary and an
error message next to each answer that contains an error.

```html
<div class="c-error-summary" role="group" id="errorSummary" aria-labelledby="errorSummaryHeading" tabindex="-1" data-component="error-summary">
	<h3 class="c-error-summary__heading" id="errorSummaryHeading">Sorry, we couldn't submit the form</h3>
	<ul data-test="specific-errors-list" class="c-error-summary__specific-list">
		<li><a href="#lastName">Please enter your last name</a></li>
		<li><a href="#passworde">Please enter your password</a></li>
	</ul>
</div>
```

### Select field

Let users select **one or more** options from a long list of options.

**Note**: Use it as a last resort as research shows that some users find selects
very difficult to use. Favour using Radios or checkbox in the case of short list
of options.

Watch a video about how some [users struggle with selects](https://www.youtube.com/watch?v=CUkMCQR4TpY).

```html
<div class="c-forms__field">
	<label for="domain">
		<span class="c-forms__label-text">Country</span>
	</label>
	<div class="c-forms__select">
		<select id="country" name="country">
			<option value="">--Please choose a country--</option>
            <option value="GB">United Kingdom</option>
            <option value="AL">Albania</option>
            <option value="AD">Andorra</option>
            <option value="AT">Austria</option>
            <option value="BY">Belarus</option>
            <option value="BE">Belgium</option>
            <option value="BA">Bosnia and Herzegovina</option>
            <option value="BG">Bulgaria</option>
            <option value="HR">Croatia (Hrvatska)</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="FR">France</option>
            <option value="GI">Gibraltar</option>
            <option value="DE">Germany</option>
            <option value="GR">Greece</option>
            <option value="VA">Holy See (Vatican City State)</option>
            <option value="HU">Hungary</option>
            <option value="IT">Italy</option>
            <option value="LI">Liechtenstein</option>
            <option value="LU">Luxembourg</option>
            <option value="MK">Macedonia</option>
            <option value="MT">Malta</option>
            <option value="MD">Moldova</option>
            <option value="MC">Monaco</option>
            <option value="ME">Montenegro</option>
            <option value="NL">Netherlands</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="RO">Romania</option>
            <option value="SM">San Marino</option>
            <option value="RS">Serbia</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="ES">Spain</option>
            <option value="UA">Ukraine</option>
            <option value="DK">Denmark</option>
            <option value="EE">Estonia</option>
            <option value="FO">Faroe Islands</option>
            <option value="FI">Finland</option>
            <option value="GL">Greenland</option>
            <option value="IS">Iceland</option>
            <option value="IE">Ireland</option>
            <option value="LV">Latvia</option>
            <option value="LT">Lithuania</option>
            <option value="NO">Norway</option>
            <option value="SJ">Svalbard and Jan Mayen Islands</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="TR">Turkey</option>
		</select>
	</div>
</div>
```

### Form buttons

Use this component to help users submit their information.

```html
<div class="c-forms__submit">
	<button type="submit" class="u-button u-button--primary">Submit</button>
</div>
```
