const { readdirSync } = require('fs');
const StyleDictionaryPackage = require('style-dictionary');
const _ = require('style-dictionary/lib/utils/es6_');

// this will return a filtering function based on brand and category
function tokenFilter(brand, category) {
	return function (token) {
		return (
			// Added in 3.0: filePath to help with filtering
			// So this will only include tokens of a given brand
			token.filePath.includes(brand) && token.attributes.category === category
		);
	};
}

StyleDictionaryPackage.registerFormat({
	name: 'myCustomFormat',
	formatter: function ({ dictionary, platform, options, file }) {
		return JSON.stringify(
			{
				properties: dictionary.allTokens
			},
			null,
			1
		);
	}
});

StyleDictionaryPackage.registerTransform({
	name: 'name/cti/kebab',
	type: 'name',
	transformer: function (token, options) {
		return `${options.prefix}-${_.kebabCase(token.path.join(' '))}`;
	}
});

function getStyleDictionaryConfig(brand, categories) {
	let destination = `../../context/brand-context/${brand}/scss`;

	return {
		include: [`${__dirname}/literal/**/*.json`],
		source: [
			`${__dirname}/literal/${brand}/**/*.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				transform: 'name/cti/kebab',
				prefix: 'tokens',
				buildPath: `./documentation/`,
				files: categories.map(category => {
					return {
						destination: `${category}.docs.json`,
						format: 'myCustomFormat',
						filter: tokenFilter(brand, category)
					};
				})
			}
		}
	};
}

console.log('Build started...');

// eslint-disable-next-line array-callback-return
['default', 'springernature', 'springer', 'nature'].map(function (brand) {
	// eslint-disable-next-line unicorn/prevent-abbreviations
	let dir = `${__dirname}/literal/${brand}`;
	const categories = readdirSync(dir);

	console.log('\n==============================================');
	console.log(`\nProcessing: [${brand}]`);

	// const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, categories));
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, categories));
	brands.buildAllPlatforms();

	console.log('\nEnd processing');
	// StyleDictionary.buildPlatform(brand);
});

console.log('\n==============================================');
console.log('\nBuild completed!');
