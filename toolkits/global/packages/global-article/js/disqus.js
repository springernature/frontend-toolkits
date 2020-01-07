
function LoadDisqus() {
	'use strict';

	var disqusLoaded = false;

	var dataFrom = function (element, name) {
		return element.getAttribute('data-disqus-' + name);
	};

	var canDisqusLoad = function (element) {
		var rect = element.getBoundingClientRect();
		return (
			rect.top >= -50 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 50 &&
            !disqusLoaded
		);
	};

	var loadDisqus = function (element) {
		// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
		/* eslint-disable camelcase */
		window.disqus_config = function () {
			this.page.remote_auth_s3 = dataFrom(element, 's3');
			this.page.api_key = dataFrom(element, 'key');
			this.sso = {
				name: dataFrom(element, 'sso-name'),
				button: dataFrom(element, 'sso-button'),
				icon: dataFrom(element, 'sso-icon'),
				url: dataFrom(element, 'sso-url'),
				logout: dataFrom(element, 'sso-logout')
			};
		};

		window.disqus_shortname = dataFrom(element, 'shortname');
		window.disqus_identifier = dataFrom(element, 'identifier');
		window.disqus_url = dataFrom(element, 'url');

		var dsq = document.createElement('script');
		dsq.async = true;

		dsq.src = '//' + window.disqus_shortname + '.disqus.com/embed.js';

		// eslint-disable-next-line unicorn/prefer-node-append
		(document.querySelectorAll('head')[0] || document.querySelectorAll('body')[0]).appendChild(dsq);
		disqusLoaded = true;
	};

	return {
		init: function (element, scheduler) {
			var check = function () {
				if (canDisqusLoad(element)) {
					scheduler.off(disqusTriggerEvents, check); // eslint-disable-line no-use-before-define
					loadDisqus(element);
				}
			};
			var disqusTriggerEvents = 'load scroll resize orientationchange';
			scheduler.on(disqusTriggerEvents, check);
		}
	};
}

if (typeof module !== 'undefined') {
	module.exports = LoadDisqus;
}
