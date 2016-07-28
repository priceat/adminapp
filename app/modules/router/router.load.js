import AppSettings from 'app/app.settings';
import forEach from 'lodash/collection/forEach';

/**
 * Iterate over the routes in our settings file, registering them
 * with the lazy router and injecting them into the navigation menu
 * if they are configured to do so.
 *
 * @param $stateProvider
 * @param $futureStateProvider
 * @constructor
 */
export function RouterLoad ($stateProvider, $futureStateProvider) {

    forEach(AppSettings.routes, (route, stateName) => {

        $futureStateProvider.futureState({
            stateName: stateName,
            urlPrefix: route.full,
            src: route.src,
            type: 'lazy'
        });

        if (route.nav) {
            AppSettings.navigation = AppSettings.navigation || [];
            AppSettings.navigation.push({
                name: route.title, state: stateName, url: '#' + route.full
            });
        }

    });

}

RouterLoad.$inject = ['$stateProvider', '$futureStateProvider'];
