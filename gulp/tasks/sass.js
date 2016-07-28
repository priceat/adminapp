/***********************
 * BUILD SASS
 ***********************/

module.exports = function(gulp) {

    var _globs = require('../globs');
    var _paths = require('../paths');
    var sequence = require('run-sequence');

    gulp.task('sass', 'Create CSS files from Sass sources.', function (done) {
        sequence(
            'sass-app',
            'sass-comp',
            done
        );
    });

    /**
     * Compile Sass files in app/style/scss into the app/style/css folder.
     */
    gulp.task('sass-app', function () {

        var sass = require('gulp-sass');
        var rename = require('gulp-rename');
        var minifyCSS = require('gulp-clean-css');
        var sourcemaps = require('gulp-sourcemaps');
        var sassJspm = require('sass-jspm-importer');

        return gulp.src(_globs.sass.app)
            .pipe(sourcemaps.init())
            .pipe(sass({
                errLogToConsole: true,
                functions: sassJspm.resolve_function(_paths.jspm),
                importer: sassJspm.importer
            }).on('error', sass.logError))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifyCSS())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(_paths.css));
    });

    /**
     * Compile Sass files found throughout the app into their own folders.
     */
    gulp.task('sass-comp', function () {

        var sass = require('gulp-sass');
        var rename = require('gulp-rename');
        var minifyCSS = require('gulp-clean-css');
        var sourcemaps = require('gulp-sourcemaps');
        var sassJspm = require('sass-jspm-importer');

        return gulp.src(_globs.sass.comp, {base: './'})
            .pipe(sourcemaps.init())
            .pipe(sass({
                errLogToConsole: true,
                functions: sassJspm.resolve_function(_paths.jspm),
                importer: sassJspm.importer
            }).on('error', sass.logError))
            .pipe(minifyCSS())
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./'));
    });

    return gulp;

};
