# Development

This application is setup with some build tools to assist in development.

* [Jump to Gulp](#gulp)
* [Jump to Karma](#karma)
* [Jump to Bundling](#bundling)
* [Jump to Local Development](#local-development)

----

## Gulp

> Gulp is a toolkit that helps you automate painful or time-consuming tasks in your
> development workflow. Integrations are built into all major IDEs and people are
> using gulp with PHP, .NET, Node.js, Java, and other platforms. Use npm modules
> to do anything you want + over 2000 curated plugins for streaming file transformations.

From your application folder, run:

```
$> gulp
```

Output:
```
Usage
  gulp [TASK] [OPTIONS...]

Available tasks
  bundle           Compile static asset bundles, takes optional -g argument.
  clean            Remove all bundles and clear bundle manifest.
  dist             Prepare your application for distribution.
  help             Display this help text.
  lint             Perform static analysis on the app Javascript
  sass             Create CSS files from Sass sources.
  server           Serve application, takes optional flag: --dev|stage|prod
  tdd              Serve test coverage, test source files on change.
  test             Run Karma unit tests and then exit.
  unbundle         Removes static asset bundles, takes optional -g argument.
```

### Gulp Tasks

#### gulp bundle

> Compile static asset bundles, takes optional -g argument.

This command uses [jspm-bundler](https://www.npmjs.com/package/jspm-bundler) and the configuration found in
```bundle.config.js``` to compile your application into bundles that are more appropriate for use in production.

Bundle all groups:

```
$> gulp bundle
```

Bundle certain groups:

```
$> gulp bundle -g libs

$> gulp bundle -g libs -g webui
```

See [Bundling](#/bundling) section below for more details.

Also see: ```gulp unbundle```.

#### gulp clean

> Remove all bundles and clear bundle manifest.

This command will delete all of the compiled assets from your bundles folder, and clean out the bundle manifest
so that your application will load all files from source.

```
$> gulp clean
```

#### gulp dist

> Prepare your application for distribution.

This command cleans, compiles Sass, and bundles your application.

```
$> gulp dist
```

#### gulp lint

> Perform static analysis on the app Javascript

This command uses [ESLint](http://eslint.org/) to test your Javascript for syntactical problems.

```
$> gulp lint
```

It is recommended that you run this command frequently to ensure your code is free of defects.

You can find the ESLint configuration and rules in ```your-app/.eslintrc```

#### gulp sass

> Create CSS files from Sass sources.

This command uses [node-sass](https://www.npmjs.com/package/node-sass) to compile SCSS files into CSS.

```
$> gulp sass
```

There are two processes that run with this one command:

 * Compile Sass from ```your-app/public/style/scss/*.scss``` into ```your-app/public/style/css/```
 * Compile Sass from ```your-app/public/app/**/*.scss``` into their own folders.

This allows you to maintain an application wide set of styles in the ```style/``` folder, but also
create component/module/route specific styles that stay in their folders.

#### gulp server

> Serve application, takes optional flag: --dev|stage

This command uses [BrowserSync](https://www.browsersync.io/) to spawn a local webserver that runs your
application at ```https://localhost:8100```.

Also see [Local Development](#/local-development) for important workflow tips.

```
$> gulp server
```

#### gulp tdd

> Serve test coverage, test source files on change.

This command is for Test Driven Development (or just Test Development).  It runs Karma and ESLint on a
watch, rerunning when files are modified.

```
$> gulp tdd
```

Code coverage reports are generated in ```your-app/test/reports/coverage/```, and served at ```https:localhost:8200```.
The coverage reports will reload automatically as the unit test coverage changes.

#### gulp test

> Run Karma unit tests and then exit.

This command uses [Karma](https://karma-runner.github.io/0.13/index.html) and [Jasmine](http://jasmine.github.io/2.4/introduction.html)
to run your unit test suite. It runs Karma once and then exits immediately.

Also see ```gulp tdd```.

```
$> gulp test
```

#### gulp unbundle

> Removes static asset bundles, takes optional -g argument.

This command uses [jspm-bundler](https://www.npmjs.com/package/jspm-bundler) to remove bundle configuration from the
bundle manifest.

Also see ```gulp bundle```.

Remove all bundle groups:

```
$> gulp unbundle
```

Remove certain groups:

```
$> gulp unbundle -g app

$> gulp unbundle -g app -g routes
```

### Extending Gulp Tasks

All of the Gulp tasks are loaded from ```your-app/gulp/tasks/```.

You can modify the existing tasks, remove tasks you do not need, or create your own to suit
the needs of your application and development workflow.

Your application paths are defined in ```your-app/gulp/paths.js```, which are used to construct
file globs in ```your-app/gulp/globs.js```.

Feel free to add or modify paths and globs as needed.

----

## Karma

> Karma is a tool which spawns a web server that executes source code against test code for
> each of the browsers connected. The results for each test against each browser are examined
> and displayed via the command line to the developer such that they can see which browsers
> and tests passed or failed.

Karma configuration is found in ```your-app/karma.conf.js```, and is setup to run tests in
[PhantomJS](http://phantomjs.org/) (a headless webkit browser), with code coverage reports
saved to ```your-app/public/test/reports/```.

Also see ```gulp tdd```.

#### Karma CLI

This is not necessary, but if you would like to run Karma from your command line, you need
to globally install the Karma CLI.

```
$> npm install karma-cli -g
```

Now you can run your test suite this way:

```
$> karma start
```

Otherwise you can run your tests through Gulp:

```
$> gulp test
```

#### Test Specs

Karma is configured to load all test files throughout your application named ```*.spec.js```.
We encourage you to keep your test files close to the sources they are testing.

For example:

```
└── myFeature
    ├── myFeature.ctrl.js
    ├── myFeature.ctrl.spec.js      <-- controller test
    ├── myFeature.html
    ├── myService.md
    ├── myFeature.module.js
    ├── myFeature.service.js
    └── myFeature.service.spec.js   <-- service test
```

----

## Jasmine

> Jasmine is an open source testing framework for JavaScript. It aims to run on any JavaScript
> enabled platform, to not intrude on the application nor the IDE, and to have easy-to-read
> syntax. It is heavily influenced by other unit testing frameworks, such as ScrewUnit, JSSpec,
> JSpec, and RSpec.

Karma is configured to use the [Jasmine Testing Framework](http://jasmine.github.io/2.4/introduction.html).

Example Jasmine test suite:

```javascript
describe('a feature', () => {
    it('should be true and not false', () => {
        expect(true).toBe(true);
        expect(true).not.toBe(false);
    });
});
````

#### Jasmine Matchers

We have installed an additional set of [Jasmine Matchers](https://github.com/JamieMason/Jasmine-Matchers#available-matchers)
for your use in your tests. These matchers make your tests more readable, while providing more useful errors when things fail.

Example:

```javascript
it('should be an empty object', () => {
    expect({}).toBeEmptyObject();
});

it('should be an array of objects', () => {
    expect([{},{},{}]).toBeArrayOfObjects();
});
```

#### Async Tests

We have installed [Jasmine Async Sugar](https://github.com/tomastrajan/jasmine-async-sugar) to enhance testing
asynchronous (promise) functionality (which is typically quite frustrating).

Example:

```javascript
function asyncMethod(str) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(str);
        }, 1000);
    });
}

itAsync('should resolve with our string', () => {
    let ourStr = 'foobarbaz';
    return asyncMethod(ourStr).then((str) => {
        expect(str).toBe(ourStr);
    });
});
```

----

## Bundling

Bundling uses the SystemJS Builder to trace the dependency graph of your application to intelligently package
Javascript, HTML, and CSS into minified files.  Our pattern for bundling is to not bundle everything into one
large distribution package, but instead bundle things into groups that relate to their functionality.

#### Locations

Bundle configuration: ```your-app/public/bundle.config.js``` (you can modify this)

Bundle manifest: ```your-app/pubilic/bundle.js``` (this is generated, do not modify)

Bundled assets: ```your-app/public/bundles/```

#### How to Bundle Everything

```
$> gulp bundle
```

#### How to Bundle Certain Groups

The bundle groups are predefined as libs, webui, app, and routes. During development, it makes sense to leave
your app and routes unbundled, but you can bundle the libraries and webui to reduce the number of files to load.

Feel free to add other groups to your bundle.config as necessary.

```
$> gulp bundle -g libs -g webui
```

#### How to Bundle Routes

Your application routes defined in ```your-app/public/app/app.settings.js``` will be used by bundle.config to
determine which route files to bundle. This allows you to build up large chunks of functionality in individual
routes, which are then bundled individually.

This configuration enables route-based lazy loading right out of the "box".

```
$> gulp bundle -g routes
```

## Local Development

You can spawn a local webserver on port ```8100``` with the command ```gulp server```, but there are some
tricks to get the most out of your local development workflow.

#### Trust Your Localhost

The first time you run the server you may be confronted with a browser warning that it is unsafe due to the
self-signed cert.  Bypass the warning, and agree to trusting this site.

Once the self-signed cert is trusted, your app should load.

#### Developing Locally in Commerce Platform

Commerce Platform passes an access token to all apps it runs. The access token is necessary to retrieve user
data or query SPS service APIs (such as Identity).

Commerce Platform dev and stage environments have the ability to run your localhost application.

**Your Local App in Dev**

This will run your app inside of ```https://dev.commerce.spscommerce.com```, with a token generated
from ```dev.id.spsc.io```.

```
$> gulp server --dev
```

**Your Local App in Stage**

This will run your app inside of ```https://stage.commerce.spscommerce.com```, with a token generated
from ```stage.id.spsc.io```.

```
$> gulp server --stage
```
