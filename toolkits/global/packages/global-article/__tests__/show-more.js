const ShowMore = require('../js/show-more');
const EventEmitter = require('../js/event-emitter');
const $ = require('jquery');
global.$ = global.jQuery = $;

const scheduler = {
	on: jest.fn().mockImplementation((event, callback) => {
		callback();
	}),
	off: jest.fn()
};

describe('ShowMore', () => {

    let showMore = null;
    let emitter = null;
    let settings = null;
    let $container = null;

	function initShowMore() {
        showMore = new ShowMore();
		emitter = new EventEmitter();
		showMore.init(settings, scheduler, emitter);
    }

	beforeAll(() => {
        window.$ = $;
        $.deviceState = jest.fn();
    })
    
	afterEach(() => {
		showMore = null;
		document.body.innerHTML = '';
        settings = null;
        $container = null;
        length = null;
	});

    describe('Should be able to initiate the show more funcationality', () => {

        beforeEach(() => {
            document.body.innerHTML = '<div data-show-more="true"><p>Four papers in this issue of <i>Nature</i> present the long-awaited high-resolution crystal structures of the four known opioid receptors in ligand-bound conformations.</p></div>';
            $container = $('div[data-show-more]');
            settings = {
                $el: $container
            };
        });

        it('has initiate the show more functionality', () => {
            initShowMore();
            expect(showMore.init).toBeDefined();
        });
    });

    describe('Should truncated text content', () => {

        beforeEach(() => {
            document.body.innerHTML = '<div data-show-more="true" data-hellip-disable-expand="true"><p>Four papers in this issue of <i>Nature</i> present the long-awaited high-resolution crystal structures of the four known opioid receptors in ligand-bound conformations. These G-protein-coupled receptors are the targets of a broad range of drugs, including painkillers, antidepressants, anti-anxiety agents and anti-addiction medications. Brian Kobilka’s group reports the crystal structure of the µ-opioid receptor bound to a morphinan antagonist and the δ-opioid receptor bound to naltrindole. Raymond Stevens’ group reports on the κ-opioid receptor bound to the selective antagonist JDTic, and the nociceptin/orphanin FQ receptor bound to a peptide mimetic. In an associated News and Views, Marta Filizola and Lakshmi Devi discuss the implications of these landmark papers for research on the mechanisms underlying receptor function and drug development.</p></div>';
            $container = $('div[data-show-more]');
            settings = {
                $el: $container,
                previewLength: 135
            };
            $.truncate =  jest.fn().mockReturnValue('Four papers in this issue of <i>Nature</i> present the long-awaited high-resolution crystal structures of the four known opioid receptors in ligand-bound conformations. These G-protein-coupled receptors are the targe');
        });

        it('has truncated the text to 135 characters', () => {
            initShowMore();
            expect(document.querySelector('div[data-show-more]').textContent).toBe('Four papers in this issue of Nature present the long-awaited high-resolution crystal structures of the four known opioid receptors in ligand-bound conformations. These G-protein-coupled receptors are the targe');
        });
    });

    describe('Should truncated text and add a show more button', () => {

        beforeEach(() => {
            document.body.innerHTML = '<div data-hellip="true" data-show-more="true" data-show-more-dest="editorial summary"><p>Four papers in this issue of <i>Nature</i> present the long-awaited high-resolution crystal structures of the four known opioid receptors in ligand-bound conformations. These G-protein-coupled receptors are the targets of a broad range of drugs, including painkillers, antidepressants, anti-anxiety agents and anti-addiction medications. Brian Kobilka’s group reports the crystal structure of the µ-opioid receptor bound to a morphinan antagonist and the δ-opioid receptor bound to naltrindole. Raymond Stevens’ group reports on the κ-opioid receptor bound to the selective antagonist JDTic, and the nociceptin/orphanin FQ receptor bound to a peptide mimetic. In an associated News and Views, Marta Filizola and Lakshmi Devi discuss the implications of these landmark papers for research on the mechanisms underlying receptor function and drug development.</p></div>';
            $container = $('div[data-show-more]');
            settings = {
                $el: $container,
                expandedAttr: 'data-text-expanded',
                trackAttribute: $container.data('show-more-dest'),
                linkAttribute: 'data-show-more',
                previewLength: 135,
                showMoreText: 'show more',
                showLessText: 'show less'
            };
        });


        it('has truncated the text and added a show more button without tracking', () => {
            settings.trackAttribute = null;
            initShowMore();
            expect(document.body.innerHTML).toBe('<div data-hellip=\"true\" data-show-more=\"true\" data-show-more-dest=\"editorial summary\">Four papers in this issue of <i>Nature</i> present the long-awaited high-resolution crystal structures of the four known opioid receptors in ligand-bound conformations. These G-protein-coupled receptors are the targe <button class=\"link-like inline\" data-show-more=\"\">show more</button></div>');
        });

        it('has add tracking to the show more button', () => {
            initShowMore(); 
            expect(document.body.innerHTML).toBe('<div data-hellip=\"true\" data-show-more=\"true\" data-show-more-dest=\"editorial summary\">Four papers in this issue of <i>Nature</i> present the long-awaited high-resolution crystal structures of the four known opioid receptors in ligand-bound conformations. These G-protein-coupled receptors are the targe <button class=\"link-like inline\" data-show-more=\"\" data-track=\"click\" data-track-label=\"button\" data-track-action=\"editorial summary show less\">show more</button></div>');
        });
    });

    describe('Should toggle button between show more and show less', () => {

        beforeEach(() => {
            document.body.innerHTML = '<div data-hellip="true" data-show-more="true" data-show-more-dest="editorial summary" data-text-expanded="true"><p>Four papers in this issue of <i>Nature</i> present the long-awaited high-resolution crystal structures of the four known opioid receptors in ligand-bound conformations. These G-protein-coupled receptors are the targets of a broad range of drugs, including painkillers, antidepressants, anti-anxiety agents and anti-addiction medications. Brian Kobilka’s group reports the crystal structure of the µ-opioid receptor bound to a morphinan antagonist and the δ-opioid receptor bound to naltrindole. Raymond Stevens’ group reports on the κ-opioid receptor bound to the selective antagonist JDTic, and the nociceptin/orphanin FQ receptor bound to a peptide mimetic. In an associated News and Views, Marta Filizola and Lakshmi Devi discuss the implications of these landmark papers for research on the mechanisms underlying receptor function and drug development.</p></div>';
            $container = $('div[data-show-more]');
            var length = $container.data('show-more-length') || 135;
            settings = {
                $el: $container,
                expandedAttr: 'data-text-expanded',
                trackAttribute: $container.data('show-more-dest'),
                linkAttribute: 'data-show-more',
                previewLength: length,
                showMoreText: 'show more',
                showLessText: 'show less'
            };
            $.truncate =  jest.fn().mockReturnValue('Four papers in this issue of <i>Nature</i> present the long-awaited high-resolution crystal structures of the four known opioid receptors in ligand-bound conformations. These G-protein-coupled receptors are the targe');
        });

        it('Toggle between open and close when button is clicked', () => {
            // jest.spyOn($, 'hasData').mockReturnValue(true);
            initShowMore();
            const button = document.querySelector('button');
            button.click();
            expect(button.innerHTML).toContain('show more');
    
        });
    });
});