
/***********************
 * UNIT TEST
 ***********************/

module.exports = function(gulp) {

    var _globs = require('../globs');
    var _paths = require('../paths');
    var sequence = require('run-sequence');

    gulp.task('test', 'Run Karma unit tests and then exit.', function (done) {
        var Karma = require('karma');
        new Karma.Server({
            configFile: _paths.config.karma,
            singleRun: true
        }, done).start();
    });

    gulp.task('test:watch', [], function (done) {
        var Karma = require('karma');
        var isdone = false;
        var server = new Karma.Server({
            configFile: _paths.config.karma,
            autoWatch: true,
            singleRun: false
        });
        server.on('run_complete', function() {
            // this ensures done() is called so that the run
            // sequence is maintained, but also ensures that
            // done() is only called once.
            if (!isdone) { done(); isdone = 1; }
        });
        server.start();
    });

    

    return gulp;

};
