const InternalNavigation = require('../js/internal-navigation');
const EventEmitter = require('../js/event-emitter');

const scheduler = {
	on: jest.fn().mockImplementation((event, callback) => {
		callback();
	}),
	off: jest.fn()
};

describe('Internal Navigation', () => {
	let nav = null;
	let emitter = null;
	let emit = null;

	function initNavigation(config = {}) {
		emitter = new EventEmitter();
		emit = jest.spyOn(emitter, 'emit');
		nav = InternalNavigation();
		nav.init(config, scheduler, emitter);
	}

	beforeEach(() => {
		document.documentElement.innerHTML = `
			<head></head>
			<body>
				<section>
					<h2 class="js-section-title" id="abstract">Abstract</h2>
					<p>Abstract</p>
				</section>
				<section>
					<h2 class="js-section-title" id="introduction">Introduction</h2>
					<p>Introduction <a href="#ref1" id="ref-link1">1</a> <a href="#ref2" id="ref-link2" class="js-no-scroll">2</a> <a href="#ref3" id="ref-link3" disabled="disabled">3</a> <a href="/external#link" id="external-link">external</a></p>
				</section>
				<section>
					<h2 class="js-section-title" id="method">Method</h2>
					<p>Method <a href="#Fig1" id="fig-link1">1</a></p>
					<div id="Fig1">Figure 1</div>
				</section>
				<section>
					<h2 class="js-section-title" id="results">Results</h2>
					<p>Results</p>
				</section>
				<section>
					<h2 class="js-section-title">References</h2>
					<div data-container-section="references">
						<ol>
							<li id="ref1">Ref 1</li>
							<li id="ref2">Ref 2</li>
							<li id="ref3">Ref 3 <a href="#ref-link3" id="return-ref-link3">back</a></li>
							<li id="ref4">Ref 4</li>
							<li id="ref5">Ref 5</li>
							<li id="ref6">Ref 6</li>
							<li id="ref7">Ref 7</li>
							<li id="ref8">Ref 8</li>
							<li id="ref9">Ref 9</li>
							<li id="ref10">Ref 10</li>
						</ol>
					</div>
				</section>
				<section class="c-reading-companion">
					<p><a href="#Fig1" id="rc-fig-link1">1</a></p>
				</section>
			</body>
		`;
	});

	afterEach(() => {
		nav = null;
		emitter = null;
		emit = null;
		document.documentElement.innerHTML = '';
	});

	test('Should be able to initiate the internal navigation', () => {
		initNavigation();
		expect(nav.init).toBeDefined();
	});

	test('Should emit a nav.anchor event if a link click triggers navigation into another section', () => {
		const link = document.getElementById('ref-link1');
		initNavigation();
		link.click();
		expect(emit).toHaveBeenCalledWith('nav.anchor', 'ref1', link);
	});

	test('Should emit a nav.anchor event for a link to a figure if there is no reading companion', () => {
		const link = document.getElementById('fig-link1');
		initNavigation();
		link.click();
		expect(emit).toHaveBeenCalledWith('nav.anchor', 'Fig1', link);
	});

	test('Should emit a nav.anchor event for a link to a figure if the link is inside the reading companion', () => {
		const link = document.getElementById('rc-fig-link1');
		initNavigation();
		emitter.emit('rc.display', true);
		link.click();
		expect(emit).toHaveBeenCalledWith('nav.anchor', 'Fig1', link);
	});

	test('Should emit a nav.figure event for a link to a figure if there is a reading companion', () => {
		const link = document.getElementById('fig-link1');
		initNavigation();
		emitter.emit('rc.display', true);
		link.click();
		expect(emit).toHaveBeenCalledWith('nav.figure', 'Fig1', link);
	});

	test('Should emit a nav.reference event for a link to a reference if there is a reading companion', () => {
		const link = document.getElementById('ref-link1');
		initNavigation();
		emitter.emit('rc.display', true);
		link.click();
		expect(emit).toHaveBeenCalledWith('nav.reference', 'ref1', link);
	});

	test('Should not emit a nav.anchor event on an external link', () => {
		const link = document.getElementById('external-link');
		initNavigation();
		link.click();
		expect(emit).not.toHaveBeenCalledWith('nav.anchor');
	});

	test('Should not emit a nav.anchor event if the link has a js-no-scroll class', () => {
		const link = document.getElementById('ref-link2');
		initNavigation();
		link.click();
		expect(emit).not.toHaveBeenCalledWith('nav.anchor');
	});

	test('Should set focus on the target element', () => {
		const link = document.getElementById('fig-link1');
		const target = document.getElementById('Fig1');
		initNavigation();
		link.click();
		expect(target.getAttribute('tabindex')).toEqual('-1');
		expect(document.activeElement).toEqual(target);
	});

	test('Should set focus on the target element even if it is disabled', () => {
		const link = document.getElementById('return-ref-link3');
		const target = document.getElementById('ref-link3');
		initNavigation();
		link.click();
		expect(target.getAttribute('tabindex')).toEqual('-1');
		expect(document.activeElement).toEqual(target);
	});
});
