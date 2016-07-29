
/**
 * Register our future StateFactory with the futureStateProvider.  When a future state
 * is loaded, it will trigger the futureStateFactory.
 *
 * @param $futureStateProvider
 * @constructor
 */
export function RouterLazy ($futureStateProvider) {

    if (typeof System === 'undefined') {
        throw new Error('Unable to instantiate RouterLazy, SystemJS not found');
    }

    $futureStateProvider.stateFactory('lazy', StateFactory);

}

RouterLazy.$inject = ['$futureStateProvider'];

StateFactory.$inject = [
    '$q',
    '$log',
    '$timeout',
    '$rootScope',
    '$ocLazyLoad',
    'futureState'
];

/**
 * Our StateFactory ties the ui-router-extras Future States feature, with the lazy
 * loading features of ocLazyLoad, and dependency injection features of SystemJS.
 *
 * @param $q
 * @param $log
 * @param $timeout
 * @param $rootScope
 * @param $ocLazyLoad
 * @param futureState
 * @returns {Promise}
 * @constructor
 */
function StateFactory ($q, $log, $timeout, $rootScope, $ocLazyLoad, futureState) {

    return $q((resolve, reject) => {

        $rootScope.$emit('Router.loading', futureState);

        System.import(futureState.src).then(route => {

            $ocLazyLoad.inject(route.name).then(() => {

                $timeout(() => {
                    $rootScope.$emit('Router.loaded', futureState);
                    resolve();
                });

            }, (err) => reject(err));

        }).catch(e => {
            $log.error('Sytem import failed for futureState', futureState);
            $log.error(e);
        });

    });

}
