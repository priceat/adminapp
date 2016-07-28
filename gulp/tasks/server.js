
/***********************
 * SERVER
 ***********************/

module.exports = function(gulp) {

    var _globs = require('../globs');
    var _paths = require('../paths');
    var sequence = require('run-sequence');

    gulp.task('server', 'Serve application, takes optional flag: --dev|stage', function (done) {
        sequence(
            'sass',
            'build:watch',
            'build:server',
            done
        );
    });

    /**
     * Watch app Sass files for changes, rebuild as needed
     */
    gulp.task('build:watch', function () {
        gulp.watch(_globs.sass.app, ['sass-app']);
        gulp.watch(_globs.sass.comp, ['sass-comp']);
    });

    /**
     * Start the BrowserSync server and open it up in one of the
     * Commerce Platform environments.
     *
     * Examples:
     *
     * // Start server, open https://localhost:8100
     * gulp server
     *
     * // Start server, open in dev.commerce.spscommerce.com
     * gulp server --dev
     *
     * // Start server, open in stage.commerce.spscommerce.com
     * gulp server --stage
     *
     * // Start server, open in commerce.spscommerce.com
     * gulp server --prod
     *
     */
    gulp.task('build:server', function (done) {

        var env;
        var opn = require('opn');
        var minimist = require('minimist');
        var browserSync = require('browser-sync');

        var opts = minimist(process.argv.slice(2));

        if (opts.prod) {
            env = 'prod';
        } else if (opts.stage) {
            env = 'stage';
        } else if (opts.dev) {
            env = 'dev';
        } else {
            env = 'local';
        }

        if (!_paths.env[env]) {
            throw new Error('Unknown environment:' + env);
        }

        browserSync.init({
            port: 8100,
            ui: { port: 8101 },
            open: false,
            https: true,
            notify: false,
            logLevel: 'info',
            ghostMode: true,
            timestamps: false,
            server: _paths.public,
            logFileChanges: false,
            files: []
                .concat(_globs.js)
                .concat(_globs.css)
                .concat(_globs.html)
        }, function(a, bs) {

            var url = _paths.env[env];
            var port = bs.options.get('port');
            url += (env === 'local') ? ':' + port : '';

            opn(url);
            done();
        });

    });

    return gulp;

};
