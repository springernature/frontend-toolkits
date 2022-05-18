const fs = require('fs');
const StyleDictionaryPackage = require('style-dictionary');
const _ = require('../../node_modules/style-dictionary/lib/utils/es6_');
const { readdirSync } = require('fs');

// this will return a filtering function based on brand and alias
function tokenFilter(brand, alias) {
	return function (token) {
		return (
			// Added in 3.0: filePath to help with filtering
			// So this will only include tokens of a given brand
			token.filePath.includes(brand) && token.attributes.category === alias
		);
	};
}

StyleDictionaryPackage.registerTransform({
	name: 'name/cti/kebab',
	type: 'name',
	transformer: function (token, options) {
		return `${options.prefix}--${_.kebabCase(token.path.join(' '))}`;
	}
});

function getStyleDictionaryConfig(brand, aliases) {
	let dest = `./context/brand-context/${brand}/scss`;

	return {
		include: [`${__dirname}/literal/**/*.json`],
		source: [
			`${__dirname}/alias/${brand}/**/*.json`,
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				prefix: "tokens",
				buildPath: `${dest}/00-tokens/`,
				files: aliases.map(alias => {
					return {
						destination: `_${alias}.variables.scss`,
						format: 'scss/variables',
						filter: tokenFilter(brand, alias)
					}
				})
			}
		}
	}
}

console.log('Build started...');

['default', 'springernature', 'springer', 'nature'].map(function (brand) {
	let dir = `${__dirname}/alias/${brand}`
	const aliases = readdirSync(dir);

	console.log('\n==============================================');
	console.log(`\nProcessing: [${brand}]`);

	// const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, aliases));
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, aliases));
	brands.buildAllPlatforms();

	console.log('\nEnd processing');
	// StyleDictionary.buildPlatform(brand);
});

['default', 'springer', 'springernature', 'nature'].map(function (brand) {
	var fileNames = fs.readdirSync(`./context/brand-context/${brand}/scss/00-tokens/`);
	let dest = `./context/brand-context/${brand}/scss/00-tokens/`;

	console.log('\n==============================================');
	console.log(`\nProcessing Sass index file: [${brand}]`);

	require('fs').writeFileSync(

		// create an index.scss based off of the dest letiable
		`${dest}/_index.scss`,

		// create a list of each file in the directory
		fileNames.map(file => {
			// return a string of the file name
			return `@import '${file}';`
		}).join('\n')
	);
});

console.log('\nalias tokens build completed');
