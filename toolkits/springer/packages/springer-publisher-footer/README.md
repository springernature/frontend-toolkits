# Springer Publisher Footer

Springer branded site footer

## Example

#### HTML
```html
<footer>
    <div class="c-publisher-footer" data-test="publisher-footer">
        <div class="c-publisher-footer__section c-publisher-footer__section--compact">
            <div class="c-publisher-footer__container">
                <img alt="Springer" itemprop="logo" width="112" height="30" role="img" src="/path/to/logo.svg">
            </div>
        </div>
        <div class="c-publisher-footer__section">
            <div class="c-publisher-footer__container">
                <div class="c-publisher-footer__menu" data-test="publisher-footer-menu">
                    <div class="c-publisher-footer__menu-group">
                        <dl class="c-publisher-footer__list">
                            <dt class="c-publisher-footer__heading">Publish with us</dt>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/authors-editors">Authors &amp; Editors</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/authors-editors/journal-author">Journal authors</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/authors-editors/journal-author/journal-author-helpdesk/publishing-ethics/14214">Publishing ethics</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/open-access">Open Access &amp; Springer</a>
                            </dd>
                        </dl>
                    </div>
                    <div class="c-publisher-footer__menu-group">
                        <dl class="c-publisher-footer__list">
                            <dt class="c-publisher-footer__heading">Discover content</dt>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://link.springer.com/">SpringerLink</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://link.springer.com/books/a/1">Books A-Z</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://link.springer.com/journals/a/1">Journals A-Z</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://link.springer.com/video">Video</a>
                            </dd>
                        </dl>
                    </div>
                    <div class="c-publisher-footer__menu-group">
                        <dl class="c-publisher-footer__list">
                            <dt class="c-publisher-footer__heading">Other services</dt>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/instructors">Instructors</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springernature.com/gp/librarians">Librarians (Springer Nature)</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/partners">Societies and Publishing Partners</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/advertisers">Advertisers</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/shop">Shop on Springer.com</a>
                            </dd>
                        </dl>
                    </div>
                    <div class="c-publisher-footer__menu-group">
                        <dl class="c-publisher-footer__list">
                            <dt class="c-publisher-footer__heading">About Springer</dt>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/about-springer">About us</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/help">Help &amp; Support</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/help/contact">Contact us</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/about-springer/media/press-releases">Press releases</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/imprint/610056">Impressum</a>
                            </dd>
                        </dl>
                    </div>
                    <div class="c-publisher-footer__menu-group">
                        <dl class="c-publisher-footer__list">
                            <dt class="c-publisher-footer__heading">Legal</dt>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/standard-terms-and-conditions-of-business">General terms &amp; conditions</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/rights-permissions">Rights &amp; permissions</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://www.springer.com/gp/privacy-policy">Privacy</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://link.springer.com/cookiepolicy">How we use cookies</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="optanon-toggle-display c-publisher-footer__link" href="javascript:void(0);">Manage cookies</a>
                            </dd>
                            <dd class="c-publisher-footer__item">
                                <a class="c-publisher-footer__link" href="https://link.springer.com/accessibility">Accessibility</a>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
```

## Template

The `./demo/index.hbs` template is designed to be consumable by your renderer. See `./demo/context.json` for the expected model / data schema. Note that `./demo/index.hbs` does not include the `<footer>` wrapper. This allows you to combine this footer with the `global-corporate-footer` inside a common `<footer>` landmark/region.
