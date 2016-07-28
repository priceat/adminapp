
/***********************
 * TDD
 ***********************/

module.exports = function(gulp) {

    var _globs = require('../globs');
    var _paths = require('../paths');
    var sequence = require('run-sequence');

    gulp.task('tdd', 'Serve test coverage, test source files on change.', function (done) {
        sequence(
            'lint:watch',
            'test:watch',
            'coverage:server',
            done
        );
    });

    gulp.task('coverage:server', function (done) {

        // Starts a BrowserSync server that watches and
        // reloads unit test coverage reports on changes.

        var browserSync = require('browser-sync');

        browserSync.create().init({
            port: 8200,
            ui: { port: 8201 },
            open: true,
            https: true,
            notify: false,
            ghostMode: false,
            logLevel: 'silent',
            logFileChanges: false,
            files: _globs.test.coverage,
            server: {baseDir: _paths.test.coverage }
        }, function() {
            done();
        });

    });

    return gulp;

};
