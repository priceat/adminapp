/***********************
 * GULP TASK LOADER
 ***********************/

module.exports = function (gulp) {

    var glob = require('glob');
    var path = require('path');
    var forEach = require('lodash/forEach');

    // Initialize the Gulp Help plugin

    gulp = require('gulp-help')(gulp, {
        hideEmpty: true,
        hideDepsMessage: true
    });

    // Synchronously load all of our tasks from the tasks folder

    forEach(glob.sync('./gulp/tasks/**/*.js'), function (file) {
        gulp = require('./tasks/' + path.basename(file))(gulp);
    });

    // Set the default task to display the help menu

    gulp.task('default', ['help']);

    return gulp;

};
