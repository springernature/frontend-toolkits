import FontFaceObserver from 'fontfaceobserver';

function loadFonts(config) {
	const fonts = [].concat.apply([], config.map(font => {
		return font.weights.map(weight => {
			return new FontFaceObserver(font.name, {
				weight: weight
			});
		});
	}));

	return Promise.all(fonts.map(font => {
		return font.load();
	}))
		.then(() => {
			const event = new CustomEvent('webfonts-loaded');
			document.documentElement.dispatchEvent(event);
			try {
				sessionStorage.fontsLoaded = true;
			} catch (e) {
				throw new Error('webfont.js: cannot set fontsloaded in session storage');
			}
		})
		.catch(e => {
			throw new Error(e);
		});
}

function init(config) {
	let fontsStored = null;

	try {
		fontsStored = sessionStorage.getItem('fontsLoaded');
	} catch (err) {
		throw new Error('webfont.js: cannot get fontsloaded from session storage');
	}

	if (fontsStored) {
		return;
	}

	return loadFonts(config);
}

export default init;
