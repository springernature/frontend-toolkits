const StyleDictionary = require('style-dictionary');
var utilities = require('./config/utilities.js');

StyleDictionary.registerFormat({
	name: 'utilityClass',
	formatter: function (dictionary, platform) {
		let output = '';
		dictionary.allProperties.forEach(function (prop) {
			var tokenType = prop.path.slice(0, 1)[0];

			utilities.forEach(function (utility) {
				if (tokenType === utility.tokenType) {
					var utilityClass = "u-" + utility.name + "-" + prop.path[1];
					output += `.${utilityClass} {${utility.CSSprop}: ${prop.value};}\n`
				}
			});
		});
		return output;
	}
});

StyleDictionary.extend({
	include: [`${__dirname}/literal/**/*.json`],
	platforms: {
		css: {
			buildPath: '../brand-context/default/scss/60-utilities/',
			transformGroup: 'scss',
			files: [{
				destination: 'u-spacing.scss',
				format: 'utilityClass'
			}]
		}
	}
}).buildAllPlatforms();
