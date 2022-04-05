const fs = require('fs');
const StyleDictionaryPackage = require('style-dictionary');
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
				files: aliases.map(alias => {
					return {
						destination: `_${alias}.variables.scss`,
						format: 'scss/variables',
						filter: tokenFilter(brand, alias)
					}
				})
			},
			// scssMaps: {
			// 	transformGroup: 'web',
			// 	buildPath: `${dest}/00-tokens/alias/`,
			// 	files: aliases.map(alias => {
			// 		return {
			// 			destination: `_${alias}.map.scss`,
			// 			format: 'scss/map-flat',
			// 			mapName: `context--${alias}`,
			// 			filter: tokenFilter(brand, alias),
			// 		}
			// 	})
			// },
		}
	}
}

console.log('Build started...');

['default', 'springernature'].map(function (brand) {
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

['default', 'springernature'].map(function (brand) {
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
