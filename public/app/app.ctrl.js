/**
 * The AppController is loaded on the body of the page and it wraps all
 * components and route views. We have defined the controllerAs 'app'
 * (in index.html), so it can be easily accessed from all views.
 */
export class AppController {

    constructor ($state, AppSettings) {

        // Make current state available via {{app.$state}}

        this.$state = $state;

        // Make application settings available via {{app.settings}}

        this.settings = AppSettings;
    }

}

AppController.$inject = ['$state', 'AppSettings'];
