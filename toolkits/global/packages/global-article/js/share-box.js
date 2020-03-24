/*
 * Share box Component to display an article link to share
 *
 */

function ShareBox() {
	'use strict';

	var TITLE_TEXT = 'Share this article';
	var DESCRIPTION_TEXT = 'Anyone you share the following link with will be able to read this content:';
	var GET_SHARE_URL_BUTTON_TEXT = 'Get shareable link';
	var COPY_TO_CLIPBOARD_LINK_TEXT = 'Copy to clipboard';
	var ADDITIONAL_TEXT = 'Provided by the Springer Nature SharedIt content-sharing initiative';
	var NO_SHARE_URL_TEXT = 'Sorry, a shareable link is not currently available for this article.';

	var GET_SHARE_URL_BUTTON_CLASS = 'js-get-share-url';
	var GET_SHARE_URL_FIELD_CLASS = 'js-share-url';
	var COPY_TO_CLIPBOARD_LINK_CLASS = 'js-copy-share-url';
	var SHARE_URL_CONTAINER_CLASS = 'js-share-url-container';
	var NO_SHARE_URL_CONTAINER_CLASS = 'js-no-share-url-container';
	var GET_SHARE_URL_FIELD_HIGHLIGHTED_CLASS = 'c-article-share-box__only-read-input--highlighted';

	var $getShareUrlElement = null;
	var $getShareUrlFieldElement = null;
	var $copyToClipboardLinkElement = null;

	var getShareUrlFieldElementHighlighted = false;

	/**
	 * Obtain html and inserts it in the $parentElement
	 */
	/* eslint-disable func-names */
	var _renderInto = function _render($parentElement) { // eslint-disable-line func-name-matching
		if ($parentElement) {
			$parentElement.innerHTML = _getTemplate(); // eslint-disable-line no-use-before-define
		}
		return Boolean($parentElement);
	};

	/**
	 * Define the template html for the component
	 *
	 * @returns {String} - html to be rendered
	 */
	var _getTemplate = function _getTemplate() {
		var $title = '<h3 class="c-article-share-box__title u-h3">' + TITLE_TEXT + '</h3>';
		var $description = '<p class="c-article-share-box__description">' + DESCRIPTION_TEXT + '</p>';
		/* eslint-disable no-multi-str */
		var $button = '<button \
			class="' + GET_SHARE_URL_BUTTON_CLASS + ' c-article-share-box__button" \
			id="get-share-url" \
			data-track="click" \
			data-track-category="article body" \
			data-track-label="button" \
			data-track-action="get shareable link">' + GET_SHARE_URL_BUTTON_TEXT + '</button>';
		var $shareUrlField = '<p \
			class="' + GET_SHARE_URL_FIELD_CLASS + ' c-article-share-box__only-read-input" \
			id="share-url" \
			data-track="click" \
			data-track-category="article body" \
			data-track-label="button" \
			data-track-action="select share url"> \
		</p>';
		var $copyToClipboardLink = '<button \
			class="' + COPY_TO_CLIPBOARD_LINK_CLASS + ' c-article-share-box__button--link-like" \
			id="copy-share-url" \
			data-track="click" \
			data-track-category="article body" \
			data-track-label="button" \
			data-track-action="copy share url">' + COPY_TO_CLIPBOARD_LINK_TEXT + '</button>';
		var $noLinkToShare = '<p class="js-c-article-share-box__no-sharelink-info c-article-share-box__no-sharelink-info">' + NO_SHARE_URL_TEXT + '</p>';
		var $additionalInfo = '<p class="js-c-article-share-box__additional-info c-article-share-box__additional-info">' + ADDITIONAL_TEXT + '</p>';

		return '<div class="c-article-share-box">' +
			$title +
			$description +
			$button + '\
			<div class="' + NO_SHARE_URL_CONTAINER_CLASS + ' u-display-none" aria-hidden="true">' +
			$noLinkToShare + '</div> \
			<div class="' + SHARE_URL_CONTAINER_CLASS + ' u-display-none" aria-hidden="true">' +
			$shareUrlField +
			$copyToClipboardLink +
			$additionalInfo + '</div> \
		</div>';
	};

	/**
	 * Define a click event for $getShareUrlElement
	 * @param {String} source - Endpoint to fetch data from
	 */
	var _addGetShareUrlClickEvent = function _addGetShareUrlClickEvent(source) {
		$getShareUrlElement = document.querySelector('.' + GET_SHARE_URL_BUTTON_CLASS);
		/* eslint-disable no-use-before-define */
		$getShareUrlElement.addEventListener('click', _onGetShareUrlClickEventHandler.bind(this, source));
	};

	/**
	 * Callback for a click event on $getShareUrlElement
	 * @param {String} source - Endpoint to fetch data from
	 * @param {Object} event
	 */
	var _onGetShareUrlClickEventHandler = function _onGetShareUrlClickEventHandler(source) {
		$getShareUrlFieldElement = document.querySelector('.' + GET_SHARE_URL_FIELD_CLASS);

		_getReadcubeShareData(source)
			.then(function (data) {
				if (data.url) {
					$getShareUrlFieldElement.innerHTML = data.url;

					_toggleVisibility(SHARE_URL_CONTAINER_CLASS);
					_addCopyEvent();
				} else {
					_toggleVisibility(NO_SHARE_URL_CONTAINER_CLASS);
				}
			})
			.catch(function () {
				_toggleVisibility(NO_SHARE_URL_CONTAINER_CLASS);
			});
	};

	/**
	 * Fetch a url from a given endpoint
	 * @param {String} source - Endpoint to fetch data from
	 * @returns {Promise} - data { url: ''}
	 */
	var _getReadcubeShareData = function _getReadcubeShareData(source) {
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();

			xhr.addEventListener('load', function () {
				if (xhr.readyState === xhr.DONE) {
					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject();
					}
				}
			});

			xhr.open('GET', source);
			xhr.send();
		});
	};

	/**
	 * Toggle visibility between initial state and after clicking one
	 */
	var _toggleVisibility = function _toggleVisibility(classSelector) {
		var $shareUrlContainerElement = document.querySelector('.' + classSelector);
		var DISPLAY_NONE = 'u-display-none';
		var DISPLAY_INLINE = 'u-display-inline';
		var ARIA_HIDDEN = 'aria-hidden';

		$getShareUrlElement.classList.add(DISPLAY_NONE);
		$getShareUrlElement.setAttribute(ARIA_HIDDEN, true);

		$shareUrlContainerElement.classList.remove(DISPLAY_NONE);
		$shareUrlContainerElement.classList.add(DISPLAY_INLINE);
		$shareUrlContainerElement.setAttribute(ARIA_HIDDEN, false);
	};

	/**
	 * Add click event on $copyToClipboardLinkElement
	 */
	var _addCopyEvent = function _addCopyEvent() {
		$copyToClipboardLinkElement = document.querySelector('.' + COPY_TO_CLIPBOARD_LINK_CLASS);

		$copyToClipboardLinkElement.addEventListener('click', function () {
			_selectUrlToShare($getShareUrlFieldElement);
			_toggleHighlightUrlOnCopy();
			document.execCommand('copy');
			setTimeout(_toggleHighlightUrlOnCopy, 500);
		});
	};

	/**
	 * Select a given child by node
	 * @param {node} node
	 */
	var _selectUrlToShare = function _selectUrlToShare(node) {
		var selection = window.getSelection();

		if (node) {
			selection.selectAllChildren(node);
		} else {
			selection.removeAllRanges();
		}
	};

	/**
	 * Highlight GET_SHARE_URL_FIELD element by adding a highlighted class and remove it after
	 */
	var _toggleHighlightUrlOnCopy = function _toggleHighlightUrlOnCopy() { // eslint-disable-line func-names
		if (getShareUrlFieldElementHighlighted) {
			$getShareUrlFieldElement.classList.remove(GET_SHARE_URL_FIELD_HIGHLIGHTED_CLASS);
			getShareUrlFieldElementHighlighted = false;
		} else {
			$getShareUrlFieldElement.classList.add(GET_SHARE_URL_FIELD_HIGHLIGHTED_CLASS);
			getShareUrlFieldElementHighlighted = true;
		}
	};

	return {
		init: function (config) {
			var doi = (config && config.doi) ? config.doi : '';
			var url = (config && config.url) ? config.url : '';
			var source = url + doi;

			if (source !== '' && _renderInto(document.querySelector('[data-component="share-box"]'))) {
				_addGetShareUrlClickEvent(source);
			}
		}
	};
}

if (typeof module !== 'undefined') {
	module.exports = ShareBox;
}
