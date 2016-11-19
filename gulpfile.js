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
        js: './src/**/*.js',
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

gulp.task('js', function() {
    return browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('sass', function() {
    return gulp
        .src(config.paths.sass)
        .pipe(sass())
        .pipe(concat('bundle-sass.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('css', function() {
    return gulp
        .src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('css:prefix', ['css'], function(){
    return gulp
        .src(config.paths.dist + '/css/bundle.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function() {
    return gulp
        .src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'sass', 'css:prefix', 'lint', 'open', 'watch']);