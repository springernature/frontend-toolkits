/* global jQuery $ */

function ShowMore() {
	'use strict';

	var settings;

	var init = function (s, scheduler, emitter) {
		settings = s;

		settings.$el.each(function () {
			var $element = $(this);
			var $button;
			var fullText = $element.text().trim();
			var fullHtml = $element.html();
			var hasButton = !$element.attr('data-hellip-disable-expand');
			var hasShowLess = !$element.attr('data-hellip-disable-show-less');
			var truncatedText;

			function insertButton($button, $element, buttonText) {
				var $inner = $element.children(':last-child').filter(function (i, element) {
					return $(element).css('display') === 'block';
				});
				// if the last child is block level we'll append the button there
				if ($inner.length === 0) {
					$inner = $element;
				}
				$inner.append($button);
				$button.html(buttonText).before(' ');
			}

			// eslint-disable-next-line unicorn/consistent-function-scoping
			function truncateText(html, length) {
				return $.truncate(html, {
					length: length,
					words: true
				});
			}

			function setUp(html, previewLength) {
				if (fullText.length >= previewLength) {
					truncatedText = truncateText(fullHtml, previewLength);
					$element.html(truncatedText);
					if (hasButton) {
						$button = $('<button class="link-like inline"' + settings.linkAttribute + '="" >' + settings.showMoreText + '</button>');
						if (settings.trackAttribute) {
							$button.attr('data-track', 'click');
							$button.attr('data-track-label', 'button');
							$button.attr('data-track-action', settings.trackAttribute + ' show less');
						}
						insertButton($button, $element, settings.showMoreText);
					}
				}
			}

			function setTrackingFor($button, state) {
				if (settings.trackAttribute) {
					$button.attr('data-track-action', settings.trackAttribute + ' show ' + state);
				}
			}

			if (hasButton) {
				$element.on('click', 'button[' + settings.linkAttribute + ']', function () {
					if ($element.hasData(settings.expandedAttr)) {
						$element.removeAttr('style');
						$element.html(truncatedText);

						insertButton($button, $element, settings.showMoreText);
						$element.removeData(settings.expandedAttr, true);
						setTrackingFor($button, 'less');
					} else {
						$element.css('maxHeight', 'none');
						$element.html(fullHtml);

						if (hasShowLess) {
							insertButton($button, $element, settings.showLessText);
							$element.attr(settings.expandedAttr, '');
							setTrackingFor($button, 'more');
						}
					}
					// transmit toggle event if element is in the reading companion
					if ($element.closest('.js-reading-companion').length > 0) {
						emitter.emit('expand', $element);
					}
				});
			}
			/*
			scheduler.on('resize orientationchange', function () {
				// either activeMediaQuery not set, or deviceState returns true (media query is active)
				if (typeof settings.activeMediaQuery !== 'object' || (typeof settings.activeMediaQuery === 'object' && $.deviceState(settings.activeMediaQuery))) {
					if ($element.hasData(settings.expandedAttr)) {
						$element.css('maxHeight', 'none');
					}
					if ($.deviceState({lt: 640})) {
						setUp(fullHtml, s.previewLength + 100);
					}
				}
			});
			*/

			if ($.deviceState({lt: 640})) {
				setUp($element, (s.previewLength + 100));
			} else {
				setUp($element, s.previewLength);
			}
		});
	};

	return {
		init: init
	};
}

if (typeof module !== 'undefined') {
	module.exports = ShowMore;
}
