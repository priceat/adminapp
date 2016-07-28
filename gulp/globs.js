
/***********************
 * GLOBS
 ***********************/

var _paths = require('./paths');

module.exports = {

    js: [
        _paths.app + '**/!(*spec).js'
    ],

    css: [
        _paths.app + '**/*.css',
        _paths.css + '**/*.css'
    ],

    map: [
        _paths.app + '**/*.map',
        _paths.css + '**/*.map'
    ],

    html: [
        _paths.app + '**/*.html'
    ],

    bundles: [
        _paths.bundles + '**/*.js',
        _paths.bundles + '**/*.css',
        _paths.bundles + '**/*.map'
    ],

    sass: {
        app: [

            // Files that are watched and then rebuilt into
            // style/css/*.min.css when they are modified.

            _paths.sass + '**/*.scss'
        ],
        comp: [

            // Files that are watched and then rebuilt into
            // their own component folders when modified.

            _paths.app + '**/*.scss'
        ]
    },

    test: {
        results: [
            _paths.test.results + '**/*.html'
        ],
        coverage: [
            _paths.test.coverage + '**/*.html'
        ]
    }
};
