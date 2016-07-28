// We're using Jasmine-matchers to expand our set of expect() methods.
// See: https://github.com/JamieMason/Jasmine-Matchers#available-matchers

var pkg = require('./package.json');

module.exports = function (config) {
    config.set({

        basePath: pkg.sps.baseURL,

        port: 9876,

        colors: true,

        autoWatch: true,

        singleRun: false,

        browsers: ['PhantomJS'],

        frameworks: ['jspm', 'jasmine'],

        reporters: ['spec', 'coverage'],

        // possible values:
        // config.LOG_DISABLE ||
        // config.LOG_ERROR ||
        // config.LOG_WARN ||
        // config.LOG_INFO ||
        // config.LOG_DEBUG
        logLevel: config.LOG_ERROR,

        files: [

            // These files are included before SystemJS loader is available,
            // so don't expect anything in here to be able to use require().

        ],

        exclude: [],

        preprocessors: {
            'app/**/*.js': ['babel'],
            'app/**/!(*spec).js': ['babel', 'coverage']
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            }
        },

        specReporter: {
            maxLogLines: 1,
            suppressSkipped: true
        },

        coverageReporter: {
            dir: 'test/reports/',
            reporters: [
                {type: 'text-summary'},
                {type: 'html', subdir: 'coverage'}
            ],
            instrumenters: {isparta : require('isparta')},
            instrumenter: {'**/*.js': 'isparta'}
        },

        jspm: {
            loadFiles: [
                'test/harness.js',
                'app/**/*.js'
            ],
            serveFiles: [
                'test/harness.js',
                'style/css/*',
                'config.js',
                'bundle.js',
                'app/**/*'
            ]
        }

    });
};
