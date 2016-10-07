/* gulpfile for keystone */

import _gulp from 'gulp';
import gulpHelp from 'gulp-help';
import watch from 'gulp-watch';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import shell from 'gulp-shell';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';

const gulp = gulpHelp(_gulp);
const reload = browserSync.reload;

// Paths config
const paths = {
  src: [
    './models/**/*.js',
    './routes/**/*.js',
    'keystone.js',
    'package.json',
  ],
  style: {
    all: './public/styles/**/*.scss',
    output: './public/styles/',
  },
};

// Styles
gulp.task('sass', 'Compile sass files', () => {
  gulp.src(paths.style.all)
		.pipe(watch(paths.style.all))
		.pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.style.output))
		.pipe(reload({ stream: true }));
});

// Keystone shell
gulp.task('runKeystone', shell.task('node keystone.js'));

gulp.task('default', ['sass', 'runKeystone']);
