import angular from 'angular';
import extend from 'lodash/object/extend';
import AppSettings from 'app/app.settings';

export class Route {

    /**
     * @param {Object} opts
     * @param {Array} [deps]
     */
    constructor (opts, deps) {

        deps = deps || [];

        let name = 'route.' + opts.name;
        let route = extend({}, AppSettings.routes[opts.name]);

        this.state = extend({url: route.slug}, route, opts);

        this.module = angular.module(name, deps)
            .config(['$stateProvider', ($stateProvider) => {
                $stateProvider.state(this.state);
            }]);
    }

}
