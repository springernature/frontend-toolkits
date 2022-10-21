const { transform } = require('@divriots/style-dictionary-to-figma');
const StyleDictionary = require('style-dictionary');
const { readdirSync } = require('fs');

StyleDictionary.registerFormat({
	name: 'figmaTokensPlugin',
	formatter: ({ dictionary }) => {
		const transformedTokens = transform(dictionary.tokens);
		return JSON.stringify(transformedTokens, null, 2);
	},
});
// create a funcion
function getStyleDictionaryConfig(brand, aliases) {
	return {
		source: [`${__dirname}/**/default/**/*.json`],
		format: {
			figmaTokensPlugin: ({ dictionary }) => {
				const transformedTokens = transform(dictionary.tokens);
				return JSON.stringify(transformedTokens, null, 2);
			},
		},
		platforms: {
			json: {
				transformGroup: 'js',
				buildPath: './context/design-tokens/',
				files: [
					{
						"destination": "figma/tokens.json",
						"format": "figmaTokensPlugin"
					},
				],
			},
		}
	}

};

['default', 'springernature', 'springer', 'nature'].map(function (brand) {
	let dir = `${__dirname}/alias/${brand}`
	const aliases = readdirSync(dir);

	console.log('\n==============================================');
	console.log(`\nProcessing: [${brand}]`);

	// const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, aliases));
	const brands = StyleDictionary.extend(getStyleDictionaryConfig(brand, aliases));
	brands.buildAllPlatforms();

	console.log('\nEnd processing');
	// StyleDictionary.buildPlatform(brand);
});
