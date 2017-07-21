import gulp       from 'gulp';
import del        from 'del';
import eslint     from 'gulp-eslint';
import nodemon    from 'gulp-nodemon';
import prefix     from 'gulp-autoprefixer';
import htmlmin    from 'gulp-htmlmin';
import sass       from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import sync       from 'browser-sync';
import webpack    from 'webpack-stream';

var reload = sync.reload;

gulp.task('build', ['scripts', 'styles']);

gulp.task('clean', del.bind(null, ['public/style.css', 'public/bundle.js'], {read: false}));

gulp.task('default', ['server', 'build', 'watch']);

gulp.task('lint', () => {
  return gulp.src(['*/**/*.js', '!node_modules/*', '!public/'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nodemon', (cb) => {
	var started = false;
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('server', ['nodemon'], () => {
  sync.init(null, {
    proxy: 'http://localhost:8887',
    notify: false,
    files: 'public/**/*.*',
    port: 8888
  });
});

gulp.task('scripts', function() {
  return gulp.src(['src/js/index.js'])
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('public'));
});

gulp.task('styles', () => {
  return gulp.src('src/styles/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public'))
});

gulp.task('watch', () => {
  gulp.watch('src/js/**/*', ['scripts', reload]);
  gulp.watch('views/**/*.hbs', reload);
  gulp.watch('src/styles/**/*', ['styles', reload]);
});
