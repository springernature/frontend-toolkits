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



function getStyleDictionaryConfig(brand, aliases) {
	let dest = `../../context/brand-context/${brand}/scss`;

	return {
		include: [`${__dirname}/literal/**/*.json`],
		source: [
			`${__dirname}/alias/${brand}/**/*.json`,
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				prefix: "t",
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

	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, aliases));
	brands.buildAllPlatforms();

	console.log('\nEnd processing');
});
