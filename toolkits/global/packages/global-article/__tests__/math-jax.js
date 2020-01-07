/* global MathJax */

const MathJaxInitialiser =  require('../js/math-jax');
const $ = require('jquery');

describe('MathJaxInitialiser', () => {
	const config = {
		'HTML-CSS': {
			linebreaks: null,
			scale: 'anyScale'
		}
	};
	const hooks = {};

	beforeAll(() => {
		window.$ = $;
	});

	test('Should have configure and load methods defined', () => {
		expect(MathJaxInitialiser.configure).toBeDefined();
		expect(MathJaxInitialiser.load).toBeDefined();
	});

	test('Should have configured with a given config plus default values', () => {
		expect(typeof MathJaxInitialiser.configure(config, hooks)).toBe('object');
		expect(MathJaxInitialiser.configure(config, hooks).hasOwnProperty('displayAlign' )).toBeTruthy();
		expect(MathJaxInitialiser.configure(config, hooks).hasOwnProperty('extensions' )).toBeTruthy();
		expect(MathJaxInitialiser.configure(config, hooks).hasOwnProperty('menuSettings' )).toBeTruthy();
		expect(MathJaxInitialiser.configure(config, hooks).menuSettings).toEqual({
			'autocollapse': false,
			'collapsible': false,
			'explorer': false,
			'zoom': 'Click'
		});
		expect(MathJaxInitialiser.configure(config, hooks)['HTML-CSS'].linebreaks).not.toBeNull();
		expect(MathJaxInitialiser.configure(config, hooks)['HTML-CSS'].scale).toBe(97);
	});

	test('Should append a new script tag in the DOME with a given source on calling a load method', () => {
		const source = '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS-MML_HTMLorMML.js';
		const mockDocument = `
		<!doctype html>
		<html lang="en">
			<head>
					<meta charset="utf-8">
					<title>Titre de la page</title>
					<script src="script.js"></script>
			</head>
			<body>
			</body>
		</html>`;
		
		document.body.innerHTML = mockDocument;

		jest.spyOn(document.getElementsByTagName('script')[0].parentNode, 'insertBefore');
		
		jest.useFakeTimers();

		MathJaxInitialiser.load(source);
		
		expect(setTimeout).toHaveBeenCalledTimes(1);
		
		jest.runAllTimers();
		
		expect(document.getElementsByTagName('script')[0].parentNode.insertBefore).toHaveBeenCalledTimes(1);
		expect(document.getElementsByTagName('script')[0].getAttribute('src')).toBe(source);
	});

	test('Should register a listener for a particular message being sent to the startup signal', () => {		
		window.MathJax = {
			Hub: {
				Register: {
					StartupHook: jest.fn()
				}
			}
		};

		jest.spyOn(MathJax.Hub.Register, 'StartupHook');
		
		const instanceConfiguration = MathJaxInitialiser.configure(config, hooks);

		expect(typeof instanceConfiguration.AuthorInit).toBe('function');

		instanceConfiguration.AuthorInit();

		expect(MathJax.Hub.Register.StartupHook).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
	});
});
