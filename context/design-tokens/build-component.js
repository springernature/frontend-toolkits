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
			`${__dirname}/literal/**/*.json`,
			`${__dirname}/alias/default/**/*.json`,
			`${__dirname}/alias/${brand}/**/*.json`
		],
		source: [
			`${__dirname}/components/${brand}/**/*.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				buildPath: `${dest}/`,
				files: components.map(component => {
					return {
						destination: `${component}/scss/00-tokens/_${brand}.tokens.scss`,
						format: 'scss/variables',
						filter: tokenFilter(brand, component),
						"options": {
							"outputReferences": true,
							"showFileHeader": false
						}
					}
				})
			}
		}
	}
}

console.log('Build started...');

['springer'].map(function (brand) {
	let dir = `${__dirname}/components/${brand}`
	const components = readdirSync(dir);
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, components));

	brands.buildAllPlatforms();

	// components.map(component => {
	// 	let dir = `./toolkits/${brand}/packages/${component}/scss/00-tokens`
	// 	const files = readdirSync(dir);
	// 	files.map(file => {
	// 		let filePath = `${dir}/${file}`
	// 		let content = fs.readFileSync(filePath, 'utf8');
	// 		let sortedContent = content.split('\n').sort().join('\n');
	// 		fs.writeFileSync(filePath, sortedContent);
	// 	})
	// });

	components.map(component => {
		let dir = `./toolkits/${brand}/packages/${component}/scss/00-tokens`
		const files = readdirSync(dir);

		files.map(file => {
			let filePath = `${dir}/${file}`
			let content = fs.readFileSync(filePath, 'utf8');
			let sortedContent = content.split('\n').sort().join('\n');
			fs.writeFileSync(filePath, sortedContent);
			let date = new Date();
			let dateString = date.toLocaleString();
			let newContent = `// Created: ${dateString}\n// Source: design-tokens/componenet/${brand}/${component}/${brand}.json\n// DO NOT edit directly\n\n${sortedContent}`;
			let addedContent = newContent.replace(/: \$/g, ': $tokens--');
			fs.writeFileSync(filePath, addedContent);
		})
	});

	console.log('\nEnd processing');
});
