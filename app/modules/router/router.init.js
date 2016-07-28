import AppSettings from 'app/app.settings';

/**
 * Setup some runtime configuration for the Router, mostly listening to
 * ui-router events and setting up the onEnter, onExit callback handlers.
 *
 * @param $timeout
 * @param $location
 * @param $rootScope
 * @param routerService
 * @constructor
 */
export function RouterInit ($timeout, $location, $rootScope, routerService) {

    // In order to redirect to states that haven't been loaded yet (as happens
    // when dealing with lazy-loaded future states), we need to convert our
    // redirects from state-based to url-based, and change via location path.

    $rootScope.$on('$stateChangeStart', (event, toState) => {
        if (toState.redirect) {
            event.preventDefault();
            var route = AppSettings.routes[toState.redirect] || {};
            var where = route.full || toState.redirect;
            $timeout(() => {
                $location.path(where);
                $rootScope.$apply();
            });
        }
    });

    // The routerService provides an onEnter and onExit callback that can be
    // used from inside your view controllers. This makes sure those work.

    $rootScope.$on('$stateChangeSuccess', () => {
        var a = arguments;
        routerService.entered(a[1], a[2]);  // toState, toParams
        routerService.exited(a[3], a[4]);   // fromState, fromParams
    });
}

RouterInit.$inject = ['$timeout', '$location', '$rootScope', 'routerService'];
