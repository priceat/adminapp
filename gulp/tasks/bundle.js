
/***********************
 * BUNDLE
 ***********************/

module.exports = function(gulp) {

    var _config;
    var _globs = require('../globs');
    var _paths = require('../paths');

    gulp.task('bundle', 'Compile static asset bundles, takes optional -g argument.', ['sass'], function () {
        var minimist = require('minimist');
        var options = minimist(process.argv.slice(2));
        var Bundler = require('jspm-bundler');
        var bundler = new Bundler(_getConfig());
        return bundler.bundle(options.g);
    });

    gulp.task('unbundle', 'Removes static asset bundles, takes optional -g argument.', [], function () {
        var minimist = require('minimist');
        var options = minimist(process.argv.slice(2));
        var Bundler = require('jspm-bundler');
        var bundler = new Bundler(_getConfig());
        return bundler.unbundle(options.g);
    });

    /**
     * The config path is a little wonky now that we're loading the gulp tasks
     * from a loader that lives in a different path than the root. This calculates
     * the relative path from where we are and the app root, and then sets the
     * bundler configuration baseURL to use this relative path.  It's a little
     * gross, but sometimes Node is a little gross.
     *
     * @private
     */
    function _getConfig() {
        if (_config) { return _config; }
        var path = require('path');
        var relpath = path.relative(__dirname, _paths.root) + '/';
        _config = require(relpath + 'bundle.config');
        _config.baseURL = relpath + _config.baseURL;
        return _config;
    }

    return gulp;

};
