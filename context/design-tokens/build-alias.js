const { readdirSync } = require('fs');
const StyleDictionaryPackage = require('style-dictionary');

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
	let destination = `../../context/brand-context/${brand}/scss`;

	return {
		include: [`${__dirname}/literal/**/*.json`],
		source: [
			`${__dirname}/alias/${brand}/**/*.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				prefix: 't',
				buildPath: `${destination}/00-tokens/`,
				files: aliases.map(alias => {
					return {
						destination: `_${alias}.variables.scss`,
						format: 'scss/variables',
						filter: tokenFilter(brand, alias)
					};
				})
			}
		}
	};
}

console.log('Build started...');

// eslint-disable-next-line array-callback-return
['default', 'springernature', 'springer', 'nature'].map(function (brand) {
	let directory = `${__dirname}/alias/${brand}`;
	const aliases = readdirSync(directory);

	console.log('\n==============================================');
	console.log(`\nProcessing: [${brand}]`);

	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, aliases));
	brands.buildAllPlatforms();

	console.log('\nEnd processing');
});
