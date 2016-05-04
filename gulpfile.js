/**
 * Created by lyin08 on 5/4/16.
 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del');

gulp.task('jshint', function() {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

// Clean
gulp.task('clean', function() {
    return del(['dist']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'imagemin','copyfonts');
});

gulp.task('usemin',['jshint'], function () {
    return gulp.src('menu.html')
        .pipe(usemin({
            css:[minifycss(),rev()],
            js: [uglify(),rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

// Images
gulp.task('imagemin', function() {
    return del(['dist/img']), gulp.src('img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('copyfonts', ['clean'], function() {
    gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
    gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
});

// Watch
gulp.task('watch', ['default'], function() {
    gulp.run('browser-sync');
    // Watch .js files
    gulp.watch('{js/**/*.js,css/**/*.css,./*.html}', ['usemin']);
    // Watch image files
    gulp.watch('img/**/*', ['imagemin']);

});

gulp.task('browser-sync', function () {
    var files = [
        '**/*.html',
        'css/**/*.css',
        'img/**/*.png',
        'js/**/*.js',
        'dist/**/*'
    ];

    //browserSync.init({
    //    files: files,
    //    //server: {
    //    //    baseDir: ".",
    //    //    index: "menu.html"
    //    //},
    //    proxy: 'http://localhost:9000',
    //    port: 7000,
    //    browser: ['google chrome']
    //});

    browserSync.init(files, {
        server: {
            baseDir: "dist"
        },
        startPath: "menu.html"
    });

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', browserSync.reload);
});