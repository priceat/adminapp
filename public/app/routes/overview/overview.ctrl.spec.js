import {Controller} from './overview.ctrl';
import currentUserMock from 'webui-core/modules/currentUser/currentUser.mock';

describe('overview.ctrl', () => {

    let controller;
    let currentUser;

    beforeEach(() => {

        currentUser = currentUserMock;
        currentUser.whenReady = function () {
            return Promise.resolve();
        };

        controller = new Controller(currentUser);
    });

    itAsync('should set user details when ready', () => {
        return currentUser.whenReady().then(function () {
            expect([{}, {}]).toBeArrayOfObjects();
            expect(controller.user).toBe(currentUser.details);
        });
    });

});
