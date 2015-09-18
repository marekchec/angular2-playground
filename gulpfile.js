'use strict';
var del                 = require( 'del' );
var gulp                = require( 'gulp' );
var gulpLoadPlugins     = require( 'gulp-load-plugins' );
var path                = require( 'path' );
var plugins             = gulpLoadPlugins( {
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

/**
 * Paths
 */
var BASE_PATHS = {
    sources:    'sources',
    dest:       'dest'
};

var PATHS = {
    libs: {
        sources: [
            './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
            './node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.js',
            './node_modules/reflect-metadata/Reflect.js',
            './node_modules/systemjs/dist/system.src.js',
            './node_modules/angular2/bundles/angular2.dev.js',
            './node_modules/angular2/bundles/router.dev.js'
        ],
        dest: path.join( BASE_PATHS.dest, 'vendor' )
    }
}

var tsProject = plugins.typescript.createProject('tsconfig.json', {
  typescript: require('typescript')
});


/**
 * Clean tasks
 */
gulp.task( 'clean:dest', function( callback ) {
    del( [ BASE_PATHS.dest ], callback );
});

/**
 * Prepare css
 */
gulp.task('stylesheets', function () {
    var postcss = require('gulp-postcss');
    return gulp.src( path.join( BASE_PATHS.sources, '**/*.css' ) )
        .pipe( plugins.postcss([
            plugins.cssnext,
            require('postcss-import')( { path: [ path.join( BASE_PATHS.sources, 'components/app/styles' ) ] } )
        ]) )
        .pipe( gulp.dest( BASE_PATHS.dest ) );
});

/**
 * Compile Typescript files to javascript
 */
gulp.task('compile:typescript', function() {
  return gulp.src(path.join( BASE_PATHS.sources, '**/*ts'))
    .pipe( plugins.plumber() )
    .pipe( plugins.typescript( tsProject ) )
    .pipe( gulp.dest( BASE_PATHS.dest ) );
});


/**
 * Copy tasks
 */
gulp.task('copy:index', function() {
  return gulp.src( [
          path.join( BASE_PATHS.sources, '**/*.html')
      ])
    .pipe( gulp.dest( BASE_PATHS.dest ) );
});

gulp.task('copy:libs', function() {
    return gulp.src( PATHS.libs.sources )
        .pipe( gulp.dest( PATHS.libs.dest ) );
});


/**
 * Inject files into index.html
 */
gulp.task('injectFilesIntoIndex', function() {
  var sources = gulp.src( path.join( PATHS.libs.dest, '**/*.js'), { read: false } );

  return gulp.src( path.join( BASE_PATHS.dest, 'index.html') )
    .pipe( plugins.inject( sources, { relative: true } ) )
    .pipe( gulp.dest( BASE_PATHS.dest ) );
});


/**
 * Serve app
 */
gulp.task('connect', function() {
    plugins.connect.server( {
        fallback: path.join( BASE_PATHS.dest, 'index.html' ),
        root: BASE_PATHS.dest
    } );
});


gulp.task('default',
    gulp.series(
        'clean:dest',
        'copy:libs',
        'compile:typescript',
        'copy:index',
        'stylesheets'
    )
);

gulp.task( 'serve',
    gulp.series(
        'connect'
    )
);