'use strict'

const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const concat      = require('gulp-concat');
const sourcemaps  = require('gulp-sourcemaps');
const gulpIf      = require('gulp-if');
const jade        = require('gulp-jade');
const uglify      = require('gulp-uglify'); // для js
const cleanCss    = require('gulp-clean-css');


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";

gulp.task('default', ['browser-sync', 'libs', 'watch'], function(){
    
});

gulp.task('libs-js', function() {
    return gulp.src([ 
        './libs/js/jquery.min.js', 
        './libs/js/jquery-ui.min.js'
        ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('result/js'))
});

gulp.task('libs-css', function() {
    return gulp.src([ 
        './libs/css/bootstrap.css', 
        './libs/css/jquery-ui.min.css', 
        './libs/css/theme.css'
        ])
        .pipe(concat('libs.css'))
        .pipe(cleanCss({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest('result/css'))
});

gulp.task('libs', ['libs-js', 'libs-css'], function() {
    
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./result"
        },
        port: 8000
    });
});

gulp.task('sass', function() {
    return gulp.src("sass/**/*.{sass,scss}")
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        //.pipe(sourcemaps.write('.'))  // для отдельного файла source map
        .pipe(gulp.dest('result/css'))
        .pipe(gulpIf(isDevelopment, browserSync.stream()));
});

gulp.task('jade', function() {
    return gulp.src("jade/**/*.jade")
        .pipe(jade({
            pretty: '    ',
        }))
        .pipe(gulp.dest('result'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src("scripts/**/*.js")
        .pipe(gulp.dest('result/js'))
        .pipe(gulpIf(isDevelopment, browserSync.stream()));
});

gulp.task('watch', function() {
    gulp.watch('sass/**/*.{sass,scss}', ['sass']);
    gulp.watch('jade/**/*.jade', ['jade', browserSync.reload]);
    gulp.watch('scripts/**/*.js', ['scripts', browserSync.reload]);
});



/*
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "yourlocal.dev"
    });
});
*/