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
			`${__dirname}/literal/default/**/*.json`,
			`${__dirname}/literal/${brand}/**/*.json`,
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
						destination: `${component}/scss/00-tokens/_${component}.tokens.scss`,
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

//  if file on disk is newer than the one in the package, don't build it else build it
function buildIfNewer(brand, component) {
	let dest = `./toolkits/${brand}/packages/`;
	let file = `${dest}/${component}/scss/00-tokens/_${component}.tokens.scss`;
	let packageFile = `${__dirname}/components/${brand}/${component}/scss/00-tokens/_${component}.tokens.scss`;
	let packageFileStats = fs.statSync(packageFile);
	let fileStats = fs.statSync(file);
	if (packageFileStats.mtime > fileStats.mtime) {
		return false;
	} else {
		return true;
	}
}


console.log('Build started...');

// the following array needs to be manually updated when more brand speicifc components are added to brands not on this list. Otherwise this will not build. This is why it is currently not part of
['springer'].map(function (brand) {

	let dir = `${__dirname}/components/${brand}`
	const components = readdirSync(dir);
	const brands = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, components));

	brands.buildAllPlatforms();

	components.map(component => {
		let dir = `./toolkits/${brand}/packages/${component}/scss/00-tokens`
		const files = readdirSync(dir);

		files.map(file => {
			let filePath = `${dir}/${file}`;
			let content = fs.readFileSync(filePath, 'utf8');
			let sortedContent = content.split('\n').sort().join('\n');
			fs.writeFileSync(filePath, sortedContent);
			let date = new Date();
			let dateString = date.toLocaleString();
			let newContent = `// Created: ${dateString}\n// Source: design-tokens/components/${brand}/${component}/${brand}.json\n// DO NOT edit directly\n\n${sortedContent}`;
			let addedContent = newContent.replace(/: \$/g, ': $t-');
			fs.writeFileSync(filePath, addedContent);
		});
	});

	console.log('\nEnd processing');
});
