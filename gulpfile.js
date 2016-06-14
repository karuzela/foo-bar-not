var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('test', function(){
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});

gulp.task('sass', function(){
    return gulp.src("scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded', 
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"))
})

gulp.task('default', ['sass'], function() {
    gulp.watch('scss/**/*.scss', ['sass'])
});