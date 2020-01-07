const LoadDisqus = require('../js/disqus');

describe('LoadDisqus', () => {
    let schedulerMock = null;
    let loadDisqus = null;
    const mockPlatformDisqus = `<div id="article-comments-container">
        <div id="disqus_thread"
            data-object="disqus"
            data-disqus-s3="s3"
            data-disqus-key="key"
            data-disqus-sso-name="sso-name"
            data-disqus-sso-button="sso-button"
            data-disqus-sso-icon="sso-icon"
            data-disqus-sso-url="sso-url"
            data-disqus-sso-logout="sso-logout"
            data-disqus-shortname="shortname"
            data-disqus-identifier="identifier"
            data-disqus-url="url">
        </div>
    </div>`;

    beforeEach(() => {
        document.body.innerHTML = `${mockPlatformDisqus}<div data-object="disqus"></div>`;
		schedulerMock = {
            on: jest.fn().mockImplementation((element, callback) => {
                console.log('called');
                callback();
            }),
            off: jest.fn()
        };
         
        loadDisqus = new LoadDisqus();
		
	});

	afterEach(() => {
        document.getElementsByTagName('html')[0].innerHTML = ''; 
        loadDisqus = null;
        schedulerMock = null;
    });
    
    test('Should be ready to load disqus', () => {
        expect(loadDisqus.init).toBeDefined();
    });

    test('Should be able to load disqus on scroll event detected', () => {
        const disqusContainer = document.querySelector('[data-object="disqus"]');
        loadDisqus.init(disqusContainer, schedulerMock);

        expect(schedulerMock.on).toHaveBeenCalled();
    });

    test('Should check if able to load disqus', () => {        
        const disqusContainer = document.querySelector('[data-object="disqus"]');
        jest.spyOn(disqusContainer, 'getBoundingClientRect');

        loadDisqus.init(disqusContainer, schedulerMock);
    
        expect(disqusContainer.getBoundingClientRect).toHaveBeenCalled();

        jest.restoreAllMocks();
    });

    test('Should has a default config on loading disqus', () => {        
        const disqusContainer = document.querySelector('[data-object="disqus"]');

        jest.spyOn(disqusContainer, 'getBoundingClientRect');
        jest.spyOn(window, 'disqus_config');
        
        loadDisqus.init(disqusContainer, schedulerMock);
        
        expect(window.disqus_config).toBeDefined();
        expect(window.disqus_shortname).toBeDefined();
        expect(window.disqus_identifier).toBeDefined();
        expect(window.disqus_url).toBeDefined();
        
        let fakeDisqusConfigObject = { page: {}};
        let disqusConfigFn = window.disqus_config.bind(fakeDisqusConfigObject);

        disqusConfigFn();
        
        let expectedFakeDisqusConfigObject = {
            page: {
                remote_auth_s3: 's3',
                api_key: 'key'
            },
            sso: {
                name: 'sso-name',
                button: 'sso-button',
                icon: 'sso-icon',
                url: 'sso-url',
                logout: 'sso-logout'
            }
        };

        expect(fakeDisqusConfigObject).toEqual(expectedFakeDisqusConfigObject);
        
        jest.restoreAllMocks();
    });

    test('Should include disqus script', () => {
        const disqusContainer = document.querySelector('[data-object="disqus"]');
        
        loadDisqus.init(disqusContainer, schedulerMock);

        let fakeDisqusConfigObject = { page: {}};
        let disqusConfigFn = window.disqus_config.bind(fakeDisqusConfigObject);

        disqusConfigFn();
        expect(document.querySelector('script').src).toBe('http://shortname.disqus.com/embed.js');
    });

    test('Should not listen for load, scroll, resize or orientation changes anymore when disqus loaded', () => {        
        const disqusContainer = document.querySelector('[data-object="disqus"]');
        jest.spyOn(disqusContainer, 'getBoundingClientRect');

        loadDisqus.init(disqusContainer, schedulerMock);
        
        expect(schedulerMock.off.mock.calls[0][0]).toBe('load scroll resize orientationchange');

        jest.restoreAllMocks();
    });

    


});
