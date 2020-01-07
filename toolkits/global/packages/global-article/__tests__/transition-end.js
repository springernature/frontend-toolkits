const TransitionEnd = require('../js/transition-end');
const $ = require('jquery');

describe('TransitionEnd', () => {
    let callback;
    let mock$Element = null;
    let addEventListenerSpy;
    let removeEventListenerSpy;

    beforeAll(() => {
        window.$ = $;
        document.body.innerHTML = '<div class="fakeTransitionElement"></div>';

        mock$Element = $('.fakeTransitionElement');
    });

    beforeEach(() => {
        callback = jest.fn();
        addEventListenerSpy = jest.spyOn(mock$Element[0], 'addEventListener');
        removeEventListenerSpy = jest.spyOn(mock$Element[0], 'removeEventListener');
        new TransitionEnd();
    });

    afterEach(() => {
        removeEventListenerSpy.mockRestore();
        addEventListenerSpy.mockRestore();
        callback.mockRestore();
    });
    
    test('Should extend jquery with a new onTransitionEnd callback function', () => {

        expect($.fn.onTransitionEnd).toBeDefined();

        const transitionEndFunction = $.fn.onTransitionEnd.bind(mock$Element);
        
        transitionEndFunction(callback);

        expect(mock$Element[0].addEventListener).toHaveBeenCalled();        
    });

    test('Should handle a transitionend event', () => {
        const transitionEndFunction = $.fn.onTransitionEnd.bind(mock$Element);
        
        transitionEndFunction(callback);

        mock$Element[0].dispatchEvent(new CustomEvent('transitionend'));
        expect(callback).toHaveBeenCalled();
        expect(removeEventListenerSpy).toHaveBeenCalled();
    });

    test('Should not handle any event when it is not recognised', () => {

        const transitionEndFunction = $.fn.onTransitionEnd.bind(mock$Element);
        
        transitionEndFunction(callback);

        mock$Element[0].dispatchEvent(new CustomEvent('nonRecogniseEvent'));
        expect(callback).not.toHaveBeenCalled();
    });
});