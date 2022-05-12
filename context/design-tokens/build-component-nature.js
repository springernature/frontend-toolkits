const fs = require('fs');
const StyleDictionaryPackage = require('style-dictionary');
const { readdirSync } = require('fs');

// this will return a filtering function based on brand and component
function tokenFilter(brand, component) {
	return function (token) {
		return (
			token.filePath.includes(brand) && token.attributes.category === component
		);
	};
}



function getStyleDictionaryConfig(brand, components) {
	let dest = `./toolkits/global/packages/`;

	return {
		include: [
			`${__dirname}/literal/**/*.json`,
			`${__dirname}/alias/default/*.json`,
			`${__dirname}/alias/nature/*.json`
		],
		source: [
			`${__dirname}/components/**/nature.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				buildPath: `${dest}/`,
				files: components.map(component => {
					return {
						destination: `${component}/scss/10-settings/_nature.variables.scss`,
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

['global'].map(function (brand) {
	let dir = `${__dirname}/components/global`
	const components = readdirSync(dir);
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, components));

	brands.buildAllPlatforms();
	components.map(component => {
		let dir = `./toolkits/global/packages/${component}/scss/10-settings`

		if (fs.existsSync(`${dir}/_nature.variables.scss`)) {

			// let brand2 equal brand
			let brand2 = brand;
			// if brand2 equal global let brand2 equal default
			if (brand2 === 'global') {
				brand2 = 'default';
			}

			// add date and time to top of index.scss file
			let filePath = `${dir}/_nature.variables.scss`
			let content = fs.readFileSync(filePath, 'utf8');
			let sortedContent = content.split('\n').sort().join('\n');

			let GeneratedContent = `// Generated on ${new Date().toLocaleString()}\n// Source: design-tokens/componenet/${brand}/${component}/nature.json\n// DO NOT edit directly\n\n${sortedContent}`;
			fs.writeFileSync(filePath, GeneratedContent);
		} else {
			console.log(`no nature brand tokens generated`);
		}
	});

	console.log('\nEnd processing');
});
