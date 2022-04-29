const StyleDictionary = require('style-dictionary');

var utilities = [
	{
		"name": "padding",
		"tokenType": "spacing",
		"CSSprop": "padding"
	},
	{
		"name": "padding-left",
		"tokenType": "spacing",
		"CSSprop": "padding-left"
	},
	{
		"name": "padding-right",
		"tokenType": "spacing",
		"CSSprop": "padding-right"
	},
	{
		"name": "padding-top",
		"tokenType": "spacing",
		"CSSprop": "padding-top"
	},
	{
		"name": "padding-bottom",
		"tokenType": "spacing",
		"CSSprop": "padding-bottom"
	},
	{
		"name": "margin",
		"tokenType": "spacing",
		"CSSprop": "margin"
	},
	{
		"name": "margin-left",
		"tokenType": "spacing",
		"CSSprop": "margin-left"
	},
	{
		"name": "margin-right",
		"tokenType": "spacing",
		"CSSprop": "margin-right"
	},
	{
		"name": "margin-top",
		"tokenType": "spacing",
		"CSSprop": "margin-top"
	},
	{
		"name": "margin-bottom",
		"tokenType": "spacing",
		"CSSprop": "margin-bottom"
	}
];


StyleDictionary.registerFormat({
	name: 'utilityClass',
	formatter: function (dictionary, platform) {
		let output = '';
		dictionary.allProperties.forEach(function (prop) {
			var tokenType = prop.path.slice(0, 1)[0];

			utilities.forEach(function (utility) {
				if (tokenType === utility.tokenType) {
					var utilityClass = "u-" + utility.name + "-" + prop.path[1];
					output += `.${utilityClass} {
  ${utility.CSSprop}: ${prop.value};
}\n\n`
				}
			});
		});
		return output;
	}
});

StyleDictionary.extend({
	// source: ['files'],
	// include: ['files'],
	include: [`${__dirname}/literal/**/*.json`],
	platforms: {
		css: {
			buildPath: 'context/brand-context/default/scss/60-utilities/',
			transformGroup: 'scss',
			files: [{
				destination: 'u-spacing.scss',
				format: 'utilityClass'
			}]
		}
	}
}).buildAllPlatforms();
