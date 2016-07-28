import {Route} from 'app/modules/router/route';
import {Controller} from './admin.ctrl';
import template from './admin.html!text';

// If your route has any Angular module dependencies,
// import them into this file and list them out in
// the ngRouteDependencies array;

var ngRouteDependencies = [];

// Create and export a new Route instance. The options
// passed here are used to define a ui-router state.

export let route = new Route({
    name: 'admin',
    template: template,
    controller: Controller,
    controllerAs: 'ctrl'
}, ngRouteDependencies);

export let name = route.module.name;
