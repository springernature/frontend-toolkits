const fs = require('fs');
const { readdirSync } = require('fs');



['default', 'springer', 'springernature', 'nature'].map(function (brand) {
	var fileNames = fs.readdirSync(`../../context/brand-context/${brand}/scss/00-tokens/`);
	let dest = `../../context/brand-context/${brand}/scss/00-tokens/`;

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
