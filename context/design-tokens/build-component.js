const fs = require('fs');
const { readdirSync } = require('fs');
const StyleDictionaryPackage = require('style-dictionary');

const componentX = process.env.npm_config_component;
let contextX = process.env.npm_config_context;
const brandX = componentX.split('-')[0];

if (!contextX && brandX === 'global') {
	contextX = 'default';
} else if (!contextX && brandX !== 'global') {
	contextX = brandX;
}

function tokenFilter(brand, component) {
	return function (token) {
		return (
			token.filePath.includes(brand) && token.attributes.category === component
		);
	};
}

function getStyleDictionaryConfig(brand, components) {

	let dest = `../../toolkits/${brandX}/packages/`;

	return {
		// we want to include the default tokens first and override them with brand tokens if available
		include: [
			`${__dirname}/literal/default/**/*.json`,
			`${__dirname}/literal/${brandX}/${componentX}/*.json`,
			`${__dirname}/alias/default/**/*.json`,
			`${__dirname}/alias/${brandX}/${componentX}/*.json`
		],
		// for each brand want to generate the Sass variables from this components tokens file
		source: [
			`${__dirname}/components/${brandX}/${componentX}/${contextX}.json`
		],
		platforms: {
			scssVariables: {
				transformGroup: 'web',
				buildPath: `${dest}/`,
				files: components.map(component => {
					return {
						destination: `${componentX}/scss/00-tokens/_${contextX}.tokens.scss`,
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

const styleDictionary = StyleDictionaryPackage.extend(
	getStyleDictionaryConfig([contextX], [componentX])
);

styleDictionary.buildAllPlatforms();

const filePath = `../../toolkits/${brandX}/packages/${componentX}/scss/00-tokens/_${contextX}.tokens.scss`;
const content = fs.readFileSync(filePath, 'utf8');
const sortedContent = content.split('\n').sort().join('\n');

const replacedContent = sortedContent.replace(/: \$/g, ': $t-');

const GeneratedContent = `// Generated on ${new Date().toLocaleString()}\n// Source: design-tokens/components/${brandX}/${componentX}/${contextX}.json\n// DO NOT edit directly\n\n${replacedContent}`;

fs.writeFileSync(filePath, GeneratedContent, 'utf8');
