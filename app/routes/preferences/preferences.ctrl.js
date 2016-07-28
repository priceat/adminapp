export class Controller {

    constructor (currentUser) {

        currentUser.whenReady().then(() => {
            this.user = currentUser.details;
        });

    }

}

Controller.$inject = ['currentUser'];
