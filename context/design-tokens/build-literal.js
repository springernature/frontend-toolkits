const fs = require('fs');
const StyleDictionaryPackage = require('style-dictionary');
const _ = require('../../node_modules/style-dictionary/lib/utils/es6_');
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

StyleDictionaryPackage.registerTransform({
	name: 'name/cti/kebab',
	type: 'name',
	transformer: function (token, options) {
		return `${options.prefix}--${_.kebabCase(token.path.join(' '))}`;
	}
});

function getStyleDictionaryConfig(brand, categories) {
	let dest = `./context/brand-context/${brand}/scss`;

	return {
		source: [
			`${__dirname}/literal/${brand}/spacing/spacing.json`,
			`${__dirname}/literal/${brand}/breakpoints/breakpoints.json`,
			`${__dirname}/literal/${brand}/sizing/sizing.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				transform: 'name/cti/kebab',
				prefix: "tokens",
				buildPath: `${dest}/00-tokens/`,
				files: categories.map(category => {
					return {
						destination: `_${category}.variables.scss`,
						format: 'scss/variables',
						filter: tokenFilter(brand, category),
					}
				})
			}
		}
	}
}

console.log('Build started...');

['default', 'springernature', 'springer', 'nature'].map(function (brand) {
	let dir = `${__dirname}/literal/${brand}`
	const categories = readdirSync(dir);

	console.log('\n==============================================');
	console.log(`\nProcessing: [${brand}]`);

	// const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, categories));
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, categories));
	brands.buildAllPlatforms();

	console.log('\nEnd processing');
	// StyleDictionary.buildPlatform(brand);
});

['default', 'springernature', 'springer', 'nature'].map(function (brand) {
	if (brand === 'default') {
		var fileNames = fs.readdirSync('./context/brand-context/default/scss/00-tokens/');
	} else if (brand === 'springernature') {
		var fileNames = fs.readdirSync('./context/brand-context/springernature/scss/00-tokens/');
	} else if (brand === 'springer') {
		var fileNames = fs.readdirSync('./context/brand-context/springer/scss/00-tokens/');
	} else if (brand === 'nature') {
		var fileNames = fs.readdirSync('./context/brand-context/nature/scss/00-tokens/');
	}
	let dest = `./context/brand-context/${brand}/scss`;
	let dir = `${__dirname}/literal/${brand}`
	console.log('\n==============================================');
	console.log(`\nProcessing Sass index file: [${brand}]`);

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
	console.log(`\n./context/brand-context/${brand}/scss/00-tokens/_index.scss created`);
	console.log('\nEnd processing');
});


// we need to make sure the existing tokens are the same as what Design are using

console.log('\n==============================================');
console.log('\nBuild completed!');