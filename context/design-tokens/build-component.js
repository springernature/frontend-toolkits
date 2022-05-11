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
			`${__dirname}/alias/**/*.json`
		],
		source: [
			`${__dirname}/components/**/*.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				buildPath: `${dest}/`,
				files: components.map(component => {
					return {
						destination: `${component}/scss/10-settings/_${brand}.variables.scss`,
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
// TODO: see if I can combine this with an existing Sass file

console.log('Build started...');

['global'].map(function (brand) {
	let dir = `${__dirname}/components/${brand}`
	const components = readdirSync(dir);
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, components));

	brands.buildAllPlatforms();

	// let file = `${__dirname}/component/${brand}/scss/10-settings/_${brand}.variables.scss`;

	components.map(component => {
		let dir = `./toolkits/${brand}/packages/${component}/scss/10-settings`
		const files = readdirSync(dir);
		files.map(file => {
			let filePath = `${dir}/${file}`
			let content = fs.readFileSync(filePath, 'utf8');
			let sortedContent = content.split('\n').sort().join('\n');
			fs.writeFileSync(filePath, sortedContent);
		})
	});

	components.map(component => {
		let dir = `./toolkits/${brand}/packages/${component}/scss/10-settings`
		const files = readdirSync(dir);
		// let brand2 equal brand
		let brand2 = brand;
		// if brand2 equal global let brand2 equal default
		if (brand2 === 'global') {
			brand2 = 'default';
		}

		files.map(file => {
			let filePath = `${dir}/${file}`
			let content = fs.readFileSync(filePath, 'utf8');
			let date = new Date();
			let dateString = date.toLocaleString();
			let newContent = `// Created: ${dateString}\n// Source: design-tokens/componenet/${brand}/${component}/${brand2}.json\n// DO NOT edit directly\n\n${content}`;
			fs.writeFileSync(filePath, newContent);
			// rename file to match ${brand2}.variables.scss
			fs.renameSync(filePath, `${dir}/${brand2}.variables.scss`);
		})
	});

	console.log('\nEnd processing');
});
