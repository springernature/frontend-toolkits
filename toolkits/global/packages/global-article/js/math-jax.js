/* global MathJax */
var MathJaxInitialiser = {
	configure: function (config, hooks) {
		/* eslint-disable new-cap */
		config.AuthorInit = function () {
			MathJax.Hub.Register.StartupHook('TeX Jax Ready', function () {
				/* eslint-disable new-cap */
				MathJax.InputJax.TeX.prefilterHooks.Add(hooks);

				var MML = MathJax.ElementJax.mml;
				var TEX = MathJax.InputJax.TeX;

				TEX.Definitions.macros.bfrac = 'myBevelFraction';

				TEX.Parse.Augment({
					myBevelFraction: function (name) {
						var num = this.ParseArg(name);
						var den = this.ParseArg(name);
						this.Push(MML.mfrac(num, den).With({bevelled: true}));
					}
				});
			});
		};

		config.displayAlign = 'center';
		config.extensions = config.extensions || [];
		config.extensions.push('[a11y]/accessibility-menu.js');
		config.menuSettings = {
			collapsible: false,
			autocollapse: false,
			explorer: false,
			zoom: 'Click'
		};

		config['HTML-CSS'].linebreaks = {automatic: true, width: '90% container'};
		config['HTML-CSS'].scale = 97;
		return config;
	},

	load: function (src) {
		setTimeout(function () {
			var d = document;
			var f = d.getElementsByTagName('script')[0];
			var s = d.createElement('script');
			s.async = true;
			s.src = src;
			f.parentNode.insertBefore(s, f);
		}, 1);
	}
};

if (typeof module !== 'undefined') {
	module.exports = MathJaxInitialiser;
}
