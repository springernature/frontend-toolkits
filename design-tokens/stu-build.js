const fs = require('fs');
const StyleDictionaryPackage = require('style-dictionary');
const { readdirSync } = require('fs');

function getStyleDictionaryConfig(brand, categories) {
	let dest = `./context/brand-context/${brand}/scss`;

	return {
		source: [
			`${__dirname}/global/${brand}/**/*.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				buildPath: `${dest}/00-tokens/`,
				files: categories.map(category => {
					return {
						destination: `_${category}.variables.scss`,
						format: 'scss/variables',
						filter: {
							attributes: {
								category
							}
						}
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
						filter: {
							attributes: {
								category
							}
						}
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
						filter: {
							attributes: {
								category
							}
						}
					}
				})
			}
		}
	}
}

['default', 'springernature', 'springer'].map(function (brand) {
	let dir = `${__dirname}/global/${brand}`
	const categories = readdirSync(dir);
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, categories));
	brands.buildAllPlatforms();
});

['default', 'springernature', 'springer'].map(function (brand) {
	if (brand === 'default') {
		var fileNames = fs.readdirSync('./context/brand-context/default/scss/00-tokens/');
	} else if (brand === 'springernature') {
		var fileNames = fs.readdirSync('./context/brand-context/springernature/scss/00-tokens/');
	} else if (brand === 'springer') {
		var fileNames = fs.readdirSync('./context/brand-context/springer/scss/00-tokens/');
	}
	let dest = `./context/brand-context/${brand}/scss`;
	let dir = `${__dirname}/global/${brand}`

	require('fs').writeFile(

		// create an index.scss based off of the dest letiable
		`${dest}/00-tokens/_index.scss`,

		// create a list of each file in the directory
		fileNames.map(file => {
			// return a string of the file name
			return `@import '${file}';`
		}).join('\n'),

		// callback function to run if the write was successful
		function (err) {
			if (err) {
				console.error('Crap happens');
			}
		}
	);
});


// we need to make sure the existing tokens are the same as what Design are using
