/* global $ */

/**
	 * Rotating Background Icons
	 * rotate a background icon, fallback to change icon
	 * @param {Object} $element - jQuery object for the element that contains icon to rotate
	 * @param {Object} options - overwrite/add to default options
	 *
	 * Example usage:
	 * $.animateIcon();
	 * $.animateIcon({
	 * 		fallbackIconStartClass: 'icon-arrow-down-12x7-white',
	 *		fallbackIconRotatedClass: 'icon-arrow-up-12x7-white'
	 * });
	 *
	 */

function AnimateIcon() {
	'use strict';

	var body = document.body || document.documentElement;
	var style = body.style;
	var supportTransform = style.transform !== undefined || style.WebkitTransform !== undefined || style.MsTransform !== undefined;

	/*
		 * Private Function
		 * toggle the icon
		 */
	var toggle = function ($icon, options) {
		var shouldBeRotated; // should be undefined unless we are insisting on a state
		if (options.hasOwnProperty('reset') && options.reset === true) { // eslint-disable-line no-prototype-builtins
			shouldBeRotated = false;
		}
		if (supportTransform) {
			$icon.toggleClass(options.iconToggleClass, shouldBeRotated);
		} else {
			var isRotated = Boolean($icon.hasClass(options.fallbackIconRotatedClass));
			if (shouldBeRotated === false) {
				isRotated = true;
			}
			$icon.toggleClass(options.fallbackIconStartClass, isRotated);
			$icon.toggleClass(options.fallbackIconRotatedClass, !isRotated);
		}
	};

	var methods = {
		init: function (options) {
			return this.each(function () {
				var $element = $(this);
				var active = true;
				var defaults = {
					iconToggleClass: 'js-icon-toggle',
					iconLocatorSelector: '.icon-rotate',
					fallbackIconStartClass: 'icon-arrow-down-12x7-gray',
					fallbackIconRotatedClass: 'icon-arrow-up-12x7-gray',
					bindToClick: true
				};
				options = options || {};
				options = $.extend(defaults, options);

				// Save our newly created settings
				$element.data('icon-settings', options);

				var $icon = $(options.iconLocatorSelector, $element).length > 0 ? $(options.iconLocatorSelector, $element) : false;

				if (options.bindToClick) {
					$element.on('click', function () {
						if (active && $icon) {
							toggle($icon, options);
						}
					});
				}
			}); // return
		},

		animate: function (options) {
			var extraOptions = options || {};
			return this.each(function () {
				var $element = $(this);
				var options = $element.data('icon-settings');
				var $icon = $(options.iconLocatorSelector, $element).length > 0 ? $(options.iconLocatorSelector, $element) : false;
				$.extend(options, extraOptions);
				if ($icon) {
					toggle($icon, options);
				}
			});
		}
	};

	$.fn.animateIcon = function () {
		var method = arguments[0];
		var options = [];

		if (methods[method]) {
			method = methods[method]; // save method if found
			options = arguments[1];
		} else if (typeof method === 'object') {
			options = method;
			method = methods.init; // default method
		} else if (!method) { // eslint-disable-line no-negated-condition
			method = methods.init; // default method
		} else {
			return this;
		}
		return method.call(this, options); // call our selected method
	};
}

if (typeof module !== 'undefined') {
	module.exports = AnimateIcon;
}
