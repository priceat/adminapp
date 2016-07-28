
/***********************
 * PATHS
 ***********************/

var path = require('path');
var pkg = require('../package.json');

var _root = require('app-root-path').toString() + '/';
var _public = require('path').join(_root, pkg.sps.baseURL) + '/';

module.exports = {

    root: _root,
    public: _public,

    config: {
        npm: _root + 'package.json',
        karma: _root + 'karma.conf.js',
        bundle: _root + 'bundle.config.js',
        system: _public + 'config.js'
    },

    app: _public + 'app/',
    css: _public + 'style/css/',
    sass: _public + 'style/scss/',
    jspm: _public + 'jspm_packages/',
    bundles: _public + 'bundles/',

    test: {
        results: _public + 'test/reports/results/',
        coverage: _public + 'test/reports/coverage/'
    },

    env: {
        local: 'https://localhost',
        prod:  'https://commerce.spscommerce.com/localhost/',
        dev:   'https://dev.commerce.spscommerce.com/localhost/',
        stage: 'https://stage.commerce.spscommerce.com/localhost/'
    }

};

