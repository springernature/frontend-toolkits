/* global $ */

/**
 * ARIA compliant role=button
 * take care when applying to links
 * buttons are expected to be triggered using the Space key, while links are expected to be triggered through the Enter key
 * @param {String} Method - Method to call "init" or "destroy". Blank defaults to "init"
 *
 * Example usage:
 * $object.giveButtonRole();
 * $object.giveButtonRole('init');
 * $object.giveButtonRole('destroy');
 *
 */

function AriaButton() {
	'use strict';

	/*
     * Private Function
     * @returns {boolean} - true if the $el can be focused by default, false if it can't
     * not checking if disabled with tabindex=-1, as can still be focused by clicking
     */
	var canFocus = function ($el) {
		if (!$el.is(':hidden') && !$el.is(':disabled')) {
			return false;
		}
		return $el.is(':input, a[href], area[href], iframe');
	};

	var methods = {
		init: function () {
			return this.each(function () {
				var $el = $(this);
				if (!$el.is('button')) {
					$el.attr('role', 'button');
					if (!canFocus($el)) {
						// used for :focus styling, e.g on an anchor tag without href
						$el.addClass('role-button');
						// if there is not already a valid tabindex apply default
						if (isNaN($el.attr('tabindex'))) {
							$el.attr('tabindex', '0');
						}
					}
					// replicate the spacebar & enter key functionality to be consistent with native button
					$el.on('keypress', function (e) {
						if (e.which === 32 || e.which === 13) {
							e.preventDefault();
							$el.triggerHandler('click');
						}
					});
				}
			});
		},
		destroy: function () {
			return this.each(function () {
				var $el = $(this);
				$el.removeAttr('role tabindex');
				$el.removeClass('role-button');
				$el.off('keypress');
			});
		}
	};

	$.fn.giveButtonRole = function () {
		var method = arguments[0];

		if (methods[method]) {
			method = methods[method]; // save method if found
		} else if (typeof method === 'object' || !method) {
			method = methods.init; // default method
		} else {
			return this;
		}
		return method.call(this); // call our selected method
	};
}

if (typeof module !== 'undefined') {
	module.exports = AriaButton;
}
