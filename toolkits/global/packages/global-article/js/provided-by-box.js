/*
 * Provided by Box Component to render the institution name and toggle its visibility
 *
 */

function ProvidedByBox() {
	'use strict';

	var parentElement = null;
	var INSTITUTION_NAME_CLASS = 'js-institution-name';

	/**
	 * Add a dynamic content in a default selector
	 * @param {string} institution name to display
	 */

	var _addInstitutionName = function _addInstitutionName(name) { // eslint-disable-line func-names
		var institutionalNameElement = null;

		if (parentElement) {
			institutionalNameElement = parentElement.querySelector('.' + INSTITUTION_NAME_CLASS);

			if (!institutionalNameElement) {
				return;
			}

			institutionalNameElement.innerHTML = name;
		}
	};

	var _render = function _render() { // eslint-disable-line func-names
		if (parentElement) {
			parentElement.classList.remove('u-display-none');
			parentElement.removeAttribute('aria-hidden');
		}
	};

	var self = {
		init: function init(config) { // eslint-disable-line func-names
			if (config && config.institutionName) {
				parentElement = document.querySelector('[data-component="provided-by-box"]');

				// eslint-disable-next-line no-warning-comments
				// TODO: ideally we should check by institution name instead of adding this additional flag
				if (Object.prototype.hasOwnProperty.call(config, 'displayInstitutionName')) {
					if (config.displayInstitutionName) {
						_addInstitutionName(config.institutionName);
					}
				}

				_render();
			}
		}
	};

	return self;
}

if (typeof module !== 'undefined') {
	module.exports = ProvidedByBox;
}

