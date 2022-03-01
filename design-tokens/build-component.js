const fs = require('fs');
const StyleDictionaryPackage = require('style-dictionary');
const { readdirSync } = require('fs');

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

function getStyleDictionaryConfig(brand, categories) {
	let dest = `./toolkits/${brand}/packages/${categories}/scss`;

	return {
		include: [
			`${__dirname}/literal/**/*.json`,
			`${__dirname}/relative/**/*.json`
		],
		source: [
			`${__dirname}/component/**/*.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				buildPath: `${dest}/00-tokens/`,
				files: categories.map(category => {
					return {
						destination: `_${category}.variables.scss`,
						format: 'scss/variables',
						filter: tokenFilter(brand, category),
					}
				})
			},
			scssMaps: {
				transformGroup: 'web',
				buildPath: `${dest}/00-tokens/`,
				files: categories.map(category => {
					return {
						destination: `_${category}.map.scss`,
						format: 'scss/map-flat',
						mapName: `context--${category}`,
						filter: tokenFilter(brand, category),
					}
				})
			},
			cssCustomProperties: {
				transformGroup: 'web',
				buildPath: `${dest}/00-tokens/`,
				files: categories.map(category => {
					return {
						destination: `_${category}.custom-properties.scss`,
						format: 'css/variables',
						filter: tokenFilter(brand, category),
					}
				})
			}
		}
	}
}

console.log('Build started...');

['global'].map(function (brand) {
	let dir = `${__dirname}/component/${brand}`
	const categories = readdirSync(dir);
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, categories));

	brands.buildAllPlatforms();

	console.log('\nEnd processing');
});
