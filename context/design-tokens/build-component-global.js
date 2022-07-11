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

	let brand2 = brand;
	// if brand2 equal global let brand2 equal default
	if (brand2 === 'global') {
		brand2 = 'default';
	}

	return {
		// we want to include the default tokens first and override them with brand tokens if available
		include: [
			`${__dirname}/literal/default/**/*.json`,
			`${__dirname}/literal/${brand2}/**/*.json`,
			`${__dirname}/alias/default/**/*.json`,
			`${__dirname}/alias/${brand2}/**/*.json`
		],
		// for each brand want to generate the Sass variables from this components tokens file
		source: [
			`${__dirname}/components/**/${brand2}.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				buildPath: `${dest}/`,
				files: components.map(component => {
					return {
						destination: `${component}/scss/00-tokens/_${brand2}.tokens.scss`,
						format: 'scss/variables',
						filter: tokenFilter(brand, component),
						"options": {
							"outputReferences": false,
							"showFileHeader": false
						}
					}
				})
			}
		}
	}
}



['global', 'springer', 'nature', 'springer-nature'].map(function (brand) {
	console.log('Build started...');
	let dir = `${__dirname}/components/global`
	const components = readdirSync(dir);
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, components));

	brands.buildAllPlatforms();

	components.map(component => {
		let dir = `./toolkits/global/packages/${component}/scss/00-tokens`;
		let brand2 = brand;
		// if brand2 equal global let brand2 equal default
		if (brand2 === 'global') {
			brand2 = 'default';
		}
		if (fs.existsSync(`${dir}/_${brand2}.tokens.scss`)) {

			let filePath = `${dir}/_${brand2}.tokens.scss`
			let content = fs.readFileSync(filePath, 'utf8');
			let sortedContent = content.split('\n').sort().join('\n');

			let replacedContent = sortedContent.replace(/: \$/g, ': $t-');

			let GeneratedContent = `// Generated on ${new Date().toLocaleString()}\n// Source: design-tokens/components/${brand}/${component}/${brand2}.json\n// DO NOT edit directly\n\n${replacedContent}`;

			fs.writeFileSync(filePath, GeneratedContent);

		}
	});

	console.log('\nEnd processing');
});

