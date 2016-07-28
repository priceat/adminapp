import '../style/css/app.min.css!';

import angular from 'angular';
import WebuiCore from 'webui-core';
import AppSettings from './app.settings';
import {AppController} from './app.ctrl';
import {Router} from './modules/router/router.module';

let AppDependencies = [
    WebuiCore.name,
    Router
];

export let App = angular
    .module('app', AppDependencies)
    .controller('AppController', AppController)
    .constant('AppSettings', AppSettings)
    .config(AppConfig)
    .run(AppInit);

export let name = App.name;

AppConfig.$inject = [];

/**
 * Setup that runs during application configuration phase.
 * Only service providers are available for injection.
 *
 * @constructor
 */
function AppConfig () {

}

AppInit.$inject = [];

/**
 * Setup that runs during the application run phase. Services,
 * factories, constants, values, etc are available for injection.
 *
 * @constructor
 */
function AppInit () {

}
