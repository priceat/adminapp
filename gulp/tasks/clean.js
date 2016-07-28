/***********************
 * CLEAN
 ***********************/

module.exports = function(gulp) {

    var _globs = require('../globs');
    var _paths = require('../paths');
    var sequence = require('run-sequence');

    gulp.task('clean', 'Remove all bundles and clear bundle manifest.', function (done) {
        sequence(
            'clean-bundles',
            'unbundle',
            done
        );
    });

    gulp.task('clean-css', function () {
        var del = require('del');
        var files = [].concat(_globs.css, _globs.map);
        return del(files);
    });

    gulp.task('clean-bundles', function () {
        var del = require('del');
        return del(_globs.bundles);
    });

    return gulp;

};
