var gulp 					= require('gulp'),
    browserSync 	= require('browser-sync'),
    sass 					= require('gulp-sass'),
    php 					= require('gulp-connect-php'),
    autoprefixer	= require('gulp-autoprefixer');

var reload  = browserSync.reload;

gulp.task('sass', function(){
	return gulp.src('course_app/scss/**/*.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('course_app/css'))
		.pipe(reload({stream: true}))
});

gulp.task('php', function() {
	php.server({ base: 'course_app', port: 8080, keepalive: true});
});


gulp.task('browser-sync', ['php'], function(){
	browserSync({
		proxy: 'localhost/course_project/course_app/',
		port: 8080,
		open: true,
		notify: false
	})
});


gulp.task('watch', ['browser-sync', 'sass'], function(){
	gulp.watch('course_app/scss/**/*.scss', ['sass']);
	gulp.watch('course_app/*.html', reload);
	gulp.watch('course_app/*.сss', reload);
	gulp.watch('course_app/*.php', reload);
	gulp.watch('course_app/js/**/*.js', reload);
});