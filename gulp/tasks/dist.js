
/***********************
 * DIST
 ***********************/

module.exports = function(gulp) {

    var sequence = require('run-sequence');

    gulp.task('dist', 'Prepare your application for distribution.', function (done) {
        sequence(
            'clean',
            'bundle',
            done
        );
    });

    return gulp;

};
