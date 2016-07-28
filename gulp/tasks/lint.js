
/***********************
 * LINT
 ***********************/

module.exports = function(gulp) {

    var _globs = require('../globs');
    var _paths = require('../paths');
    var sequence = require('run-sequence');

    gulp.task('lint', 'Perform static analysis on the app Javascript',  function () {
        var print = require('gulp-print');
        var eslint = require('gulp-eslint');
        return gulp.src(_globs.js)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .pipe(print(function (filepath) {
                return 'Linted: ' + filepath;
            }));
    });

    gulp.task('lint:changed', function () {
        var print = require('gulp-print');
        var cache = require('gulp-cached');
        var eslint = require('gulp-eslint');
        return gulp.src(_globs.js)
            .pipe(cache('linting'))  // Only lint changed or uncached files
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(print(function (filepath) {
                return 'Linted: ' + filepath;
            }));
    });

    gulp.task('lint:watch', ['lint:changed'], function () {
        gulp.watch(_globs.js, ['lint:changed']);
    });

    return gulp;

};
