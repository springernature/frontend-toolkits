/*
	A note on this file & monorepos
	https://babeljs.io/docs/en/config-files#monorepos
*/

module.exports = function (api) {
	api.cache(true);

	const presets = ['@babel/preset-env'];
	const plugins = [];

	return {
		presets,
		plugins,
		babelrcRoots: [
			'.',
			'packages/*'
		]
	};
};
