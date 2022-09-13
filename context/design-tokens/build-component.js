const fs = require('fs');
const { readdirSync } = require('fs');
const StyleDictionaryPackage = require('style-dictionary');

// this will return a filtering function based on brand and component
function tokenFilter(brand, component) {
	return function (token) {
		return (
			token.filePath.includes(brand) && token.attributes.category === component
		);
	};
}

const componentX = process.env.npm_config_component;
const brandX = process.env.npm_config_brand;

// create a new variable called dave that is componenX before the -
let dave = componentX.split('-')[0];
console.log(dave);

function getStyleDictionaryConfig(brand, components) {

	let dest = `../../toolkits/${brandX}/packages/`;
	console.log(dest);

	let brand2 = brandX;
	// if brand2 equal global let brand2 equal default
	if (brand2 === 'global') {
		brand2 = 'default';
	}

	// let source equal ${__dirname}/components/${brand2}/${componentX}/${brand2}.json
	let sourceX = `${__dirname}/components/${brand2}/${componentX}/${brand2}.json`;
	console.log(sourceX);

	return {
		// we want to include the default tokens first and override them with brand tokens if available
		include: [
			`${__dirname}/literal/default/**/*.json`,
			`${__dirname}/literal/${brand2}/${componentX}/*.json`,
			`${__dirname}/alias/default/**/*.json`,
			`${__dirname}/alias/${brand2}/${componentX}/*.json`
		],
		// for each brand want to generate the Sass variables from this components tokens file
		source: [
			`${__dirname}/components/${brandX}/${componentX}/${brand2}.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				buildPath: `${dest}/`,
				files: components.map(component => {
					return {
						destination: `${componentX}/scss/00-tokens/_${brand2}.tokens.scss`,
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

// run getStyleDictionaryConfig
const styleDictionary = StyleDictionaryPackage.extend(
	getStyleDictionaryConfig([brandX], [componentX])
);

styleDictionary.buildAllPlatforms();

let brand2 = brandX;
// if brand2 equal global let brand2 equal default
if (brand2 === 'global') {
	brand2 = 'default';
}

// get the outputted file and add the date and time to the top
const filePath = `../../toolkits/${brandX}/packages/${componentX}/scss/00-tokens/_${brand2}.tokens.scss`;
const content = fs.readFileSync(filePath, 'utf8');
const sortedContent = content.split('\n').sort().join('\n');

const replacedContent = sortedContent.replace(/: \$/g, ': $t-');

const GeneratedContent = `// Generated on ${new Date().toLocaleString()}\n// Source: design-tokens/components/${brandX}/${componentX}/${brand2}.json\n// DO NOT edit directly\n\n${replacedContent}`;

fs.writeFileSync(filePath, GeneratedContent, 'utf8');
