const EventEmitter = require('../js/event-emitter');

describe('EventEmitter', () => {
    let EventEmitterInstance = null;

    beforeEach(() => {
        EventEmitterInstance = new EventEmitter();
    });
    
    afterEach(() => {
        EventEmitterInstance = null;
    });

    test('Should have a set of empty listeners when no event is registered', () => {
        expect(EventEmitterInstance.listeners).toEqual({});
    });

    test('Should be able to register a new event', () => {
        expect(EventEmitterInstance.on).toBeDefined();
    });

    test('Should be able to unregister a new event', () => {
        expect(EventEmitterInstance.off).toBeDefined();
    });

    test('Should be able to emit a new event', () => {
        expect(EventEmitterInstance.emit).toBeDefined();
    });

    test('Should have registered a new event listener for a given element', ()=> {
        EventEmitterInstance.on('eventName1', () => {});
        
        expect(EventEmitterInstance.listeners['eventName1']).toBeDefined();
        expect(EventEmitterInstance.listeners['eventName1'][0].fn).toEqual(expect.any(Function));
        expect(EventEmitterInstance.listeners['eventName1'][0].scope).toBeNull();

        const fakeScope = () => {};
        EventEmitterInstance.on('eventName2', () => {}, fakeScope);

        expect(EventEmitterInstance.listeners['eventName2'][0].scope).toBe(fakeScope);
    });

    test('Should register multiple events for the same given element', () => {
        const callback1 = jest.fn();
        EventEmitterInstance.on('eventName', callback1);
        
        expect(EventEmitterInstance.listeners['eventName'][0].fn).toBe(callback1);

        const callback2 = jest.fn();
        EventEmitterInstance.on('eventName', callback2);

        expect(EventEmitterInstance.listeners['eventName'][1].fn).toBe(callback2);
        
        jest.resetAllMocks();
    });

    test('Should not unregister an undefined event listener', () => {
        expect(EventEmitterInstance.off('eventName', () => {})).toBe(false);
    });

    test('Should unregister all listener for a registered event when no callback function is provided', () => {
        EventEmitterInstance.on('eventName', () => {});
        EventEmitterInstance.off('eventName');

        expect(EventEmitterInstance.listeners['eventName']).toBeNull();
    });

    test('Should delete the specific registered listener under a given event', () => {
        const callbackFunction = jest.fn();
        const callbackFunction2 = jest.fn();

        EventEmitterInstance.on('eventName', callbackFunction);
        EventEmitterInstance.on('eventName', callbackFunction2);

        expect(EventEmitterInstance.listeners['eventName'].length).toBe(2);
        expect(EventEmitterInstance.off('eventName', callbackFunction)).toBeTruthy();
        expect(EventEmitterInstance.listeners['eventName'].length).toBe(1);

        jest.resetAllMocks();
    });

    test('Should call a callback function when emitting a registered event', () => {
        const callbackFunction = jest.fn();
        EventEmitterInstance.on('eventName', callbackFunction);
        EventEmitterInstance.emit('eventName');

        expect(callbackFunction).toHaveBeenCalled();

        const callbackFunction2 = jest.fn();
        EventEmitterInstance.on('eventName', callbackFunction2);

        const anyArgument = 'anyArgument';
        EventEmitterInstance.emit('eventName', anyArgument);

        expect(callbackFunction2).toHaveBeenCalledWith(anyArgument);

        jest.resetAllMocks();
    });
});