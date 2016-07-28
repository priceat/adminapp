import {AppController} from './app.ctrl';

describe('app.ctrl', () => {

    let controller;
    let $stateMock = {};
    let settingsMock = {};

    beforeEach(() => {
        controller = new AppController($stateMock, settingsMock);
    });

    it('should have $state property', () => {
        expect(controller).toHaveObject('$state');
    });

    it('should have settings property', () => {
        expect(controller).toHaveObject('settings');
    });

});
