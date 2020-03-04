import webfonts from '../../js';
import FontFaceObserver from 'fontfaceobserver';

jest.mock('fontfaceobserver');

describe('webfonts.js', () => {
	document.fonts = {
		load: () => Promise.resolve()
	};

	beforeEach(() => {
		FontFaceObserver.mockClear();
	});

	afterEach(() => {
		sessionStorage.removeItem('fontsLoaded');
	});

	describe('init', () => {
		test('Should not load fonts if fontsLoaded key is in session storage', () => {
			// Given
			window.sessionStorage.fontsLoaded = 'true';
			// When
			webfonts([{name: 'Europa', weights: ['100', '400', '700']}]);
			// Then
			expect(FontFaceObserver).not.toHaveBeenCalled();
		});
	});

	describe('loadFonts', () => {
		test('Should load correct fonts for BioMed Central', done => {
			// Given
			// When
			webfonts([{name: 'Europa', weights: ['100', '400', '700']},{name: 'Noto Serif', weights: ['400', '700']}])
			// Then
				.then(() => {
					expect(FontFaceObserver).toHaveBeenCalledTimes(5);
					for (let i = 0; i < FontFaceObserver.mock.calls; i++) {
						const arg = FontFaceObserver.mock.calls.argsFor(i)[0];
						const fontMatch = arg.includes('Europa') || arg.includes('Noto Serif');
						expect(fontMatch).toBe(true);
						expect(FontFaceObserver).toHaveBeenCalledTimes(1)
					}
					done();
				});
		});

		test('Should load correct fonts for SpringerOpen and Springer', done => {
			// Given
			const spy = jest.spyOn(document.fonts, 'load');
			// When
			webfonts([{name: 'Source Sans Pro', weights: ['400', '700']}])
			// Then
				.then(() => {
					expect(FontFaceObserver).toHaveBeenCalledTimes(2);
					for (let i = 0; i < FontFaceObserver.mock.calls; i++) {
						const arg = FontFaceObserver.mock.calls.argsFor(i)[0];
						const fontMatch = arg.includes('Source Sans Pro');
						expect(fontMatch).toBe(true);
					}
					done();
				});
		});

		test('Should add property to session storage', done => {
			// Given
			// When
			webfonts([{name: 'Europa', weights: ['100', '400', '700']}])
			// Then
				.then(() => {
					expect(sessionStorage.fontsLoaded).toBe('true');
					done();
				});
		});
	});
});
