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

StyleDictionaryPackage.registerFormat({
	name: 'css/variables',
	formatter: function (dictionary) {
		return `@if global-variable-exists(use_custom_properties) {
	${dictionary.allProperties.map(prop => `--${prop.name}: ${prop.value};`).join('\n	')}
}`
	}});

function getStyleDictionaryConfig(brand, categories) {
	let dest = `./context/brand-context/${brand}/scss`;

	return {
		include: [`${__dirname}/global/**/*.json`],
		source: [
			`${__dirname}/alias/${brand}/**/*.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				buildPath: `${dest}/00-tokens/alias/`,
				files: categories.map(category => {
					return {
						destination: `_${category}.variables.scss`,
						format: 'scss/variables',
						filter: tokenFilter(brand, category),
						"options": {
							"outputReferences": true
						}
					}
				})
			},
			// scssMaps: {
			// 	transformGroup: 'web',
			// 	buildPath: `${dest}/00-tokens/alias/`,
			// 	files: categories.map(category => {
			// 		return {
			// 			destination: `_${category}.map.scss`,
			// 			format: 'scss/map-flat',
			// 			mapName: `context--${category}`,
			// 			filter: tokenFilter(brand, category),
			// 		}
			// 	})
			// },
			// cssCustomProperties: {
			// 	transformGroup: 'web',
			// 	buildPath: `${dest}/00-tokens/alias/`,
			// 	files: categories.map(category => {
			// 		return {
			// 			destination: `_${category}.custom-properties.scss`,
			// 			format: 'css/variables',
			// 			filter: tokenFilter(brand, category),
			// 		}
			// 	})
			// }
		}
	}
}

console.log('Build started...');

['default'].map(function (brand) {
	let dir = `${__dirname}/alias/${brand}`
	const categories = readdirSync(dir);

	console.log('\n==============================================');
	console.log(`\nProcessing: [${brand}]`);

	// const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, categories));
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, categories));
	brands.buildAllPlatforms();

	console.log('\nEnd processing');
	// StyleDictionary.buildPlatform(brand);
});

['default'].map(function (brand) {
	var fileNames = fs.readdirSync(`./context/brand-context/${brand}/scss/00-tokens/alias/`);
	let dest = `./context/brand-context/${brand}/scss/00-tokens/alias`;

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
