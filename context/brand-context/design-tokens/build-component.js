const fs = require('fs');
const StyleDictionaryPackage = require('style-dictionary');
const { readdirSync } = require('fs');

// this will return a filtering function based on brand and component
function tokenFilter(brand, component) {
	return function (token) {
		return (
			// Added in 3.0: filePath to help with filtering
			// So this will only include tokens of a given brand
			token.filePath.includes(brand) && token.attributes.category === component
		);
	};
}

function getStyleDictionaryConfig(brand, components) {
	let dest = `./toolkits/${brand}/packages/`;

	return {
		include: [
			`${__dirname}/global/**/*.json`,
			`${__dirname}/alias/**/*.json`
		],
		source: [
			`${__dirname}/component/**/*.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				buildPath: `${dest}/`,
				files: components.map(component => {
					return {
						destination: `${component}/scss/10-settings/_${component}.variables.scss`,
						format: 'scss/variables',
						filter: tokenFilter(brand, component),
						"options": {
							"outputReferences": true
						}
					}
				})
			}
		}
	}
}
// TODO: see if I can combine this with an existing Sass file

console.log('Build started...');

['global'].map(function (brand) {
	let dir = `${__dirname}/component/${brand}`
	const components = readdirSync(dir);
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, components));

	brands.buildAllPlatforms();

	console.log('\nEnd processing');
});
