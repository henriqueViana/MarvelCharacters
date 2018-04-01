const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
const util = require('gulp-util');

gulp.task('app', ['app.html', 'app.css', 'app.js']);

gulp.task('app.html', () => {
    return gulp.src('app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('public'));
});

gulp.task('app.css', () => {
    return gulp.src('app/**/*.css')
        .pipe(uglifycss({uglyComments: true}))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('app.js', () => {
    return browserify({
            entries: 'app/js/Main.js',
            debug: true
        })
        .transform(babelify, {presets: ['env']})
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(gulp.dest('public/assets/js')); 
});