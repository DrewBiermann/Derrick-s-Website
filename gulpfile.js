var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer');

// Scripts Task
// Uglifies
gulp.task('scripts', function(){
    gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('minjs'));
});


// Styles Task
// Uglifiesv
gulp.task('styles', function() { 
    return sass('scss/*.scss', {
        style: 'compressed'
    })
    .pipe(plumber())
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

// Image Task
// Compress
gulp.task('image', function() { 
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

//html Task

gulp.task('html', function() {
    return gulp.src([
        './index.html'
    ])
    .pipe(livereload());
});


//Watch Task
//Watches JS
gulp.task('watch',function(){
    
    livereload.listen({start: true});
    
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('scss/*.scss', ['styles']);
    gulp.watch('./index.html', ['html']);
});

gulp.task('default',['scripts' , 'styles', 'watch']);