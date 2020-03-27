import gulp     from 'gulp';
import sass     from 'gulp-sass';
import prefix   from 'gulp-autoprefixer';
import babel    from 'gulp-babel';
import concat   from 'gulp-concat';
import uglify   from 'gulp-uglify';
import rename   from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import del      from 'del';
import imagemin from 'gulp-imagemin';

const paths = {
  styles: {
    src: './src/scss/**/*.scss',
    dest: './src/_includes/assets/css/'
  },
  scripts: {
    src: './src/scripts/**/*.js',
    dest: './src/_includes/assets/scripts/'
  },
  images: {
    src: './src/images/*',
    dest: './src//_includes/assets/images'
  }
};

/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del([ 'assets' ]);
 
/*
 * You can also declare named functions and export them as tasks
 */
export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}


export function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))
}
 
export function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}
 
 /*
  * You could even use `export as` to rename exported tasks
  */
function watch() {
  gulp.watch(paths.scripts.src, gulp.parallel(scripts));
  gulp.watch(paths.styles.src, gulp.parallel(styles));
  gulp.watch(paths.images.src, gulp.parallel(images));
}
 
const build = gulp.series(clean, gulp.parallel(watch));
/*
 * Export a default task
 */
export default build;
