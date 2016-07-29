
import angular from 'angular';

import 'ocLazyLoad';
import 'ui-router-extras';

import {Route} from './route';
import {RouterLazy} from './router.lazy';
import {RouterLoad} from './router.load';
import {RouterInit} from './router.init';
import {RouterService} from './router.service';

export let Router = angular
    .module('app.router', [
        'ui.router',
        'oc.lazyLoad',
        'ct.ui.router.extras'
    ])
    .service('routerService', RouterService)
    .value('Route', Route)
    .config(RouterLazy)
    .config(RouterLoad)
    .run(RouterInit)
    .name;
