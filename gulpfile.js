"use strict";

var gulp = require('gulp'),
    connect = require('gulp-connect'),          // local dev server
    open = require('gulp-open'),                // open url in browser
    browserify = require('browserify'),         // bundle JS
    reactify = require('reactify'),             // compile React JSX to JS
    source = require('vinyl-source-stream'),    // use conventional text streams with Gulp
    concat = require('gulp-concat'),            // concatenates files
    lint = require('gulp-eslint'),              // ESLint JS and JSX files
    rev = require('gulp-rev-append'),           // cache busting
    sass = require('gulp-sass'),                // Sass
    sourcemaps = require('gulp-sourcemaps'),    // source maps for debugging
    autoprefixer = require('gulp-autoprefixer');// browser prefixes for stylesheets

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',                   // glob
        images: './src/images/*',
        js: [
            './src/**/*.js'
        ],
        libJs: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js'
        ],
        sass: [
            './src/sass/**/*.scss'
        ],
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
};

gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function() {
    return gulp
        .src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
    return gulp
        .src(config.paths.html)
        .pipe(rev())
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('images', function() {
    return gulp
        .src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());
});

gulp.task('images:favicon', function() {
    return gulp
        .src('./src/favico.ico')
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js:lib:concat', function() {
    return gulp
        .src(config.paths.libJs)
        .pipe(concat('bundle-lib.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
});

gulp.task('js:concat', function() {
    return browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
});

gulp.task('js:sourcemaps', ['js:concat'], function() {
    return gulp
        .src(config.paths.dist + '/scripts/bundle.js')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    return gulp
        .src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('sass', function() {
    return gulp
        .src(config.paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('bundle-sass.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('sass:prefix', ['sass'], function(){
    return gulp
        .src(config.paths.dist + '/css/bundle-sass.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }))
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('lint', function() {
    return gulp
        .src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js:concat', 'js:sourcemaps', 'lint']);
    gulp.watch(config.paths.sass, ['sass', 'sass:prefix']);
});

gulp.task(
    'default',
    [
        'html',
        'js:lib:concat',
        'js:concat',
        'js:sourcemaps',
        'sass',
        'sass:prefix',
        'css',
        'images',
        'images:favicon',
        'lint',
        'open',
        'watch'
    ]
);