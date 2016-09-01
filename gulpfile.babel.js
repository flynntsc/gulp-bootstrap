'use strict';

// Import
import gulp from 'gulp'
import del from 'del'
import Bs from 'browser-sync'
import Glp from 'gulp-load-plugins'

// Config
const browserSync = Bs.create()
const reload = browserSync.reload
const Pi = Glp({
    rename: {
        'gulp-clean-css': 'cleanCss',
        'gulp-html-extend': 'htmlExtend',
    }
})
const Paths = {
    views: {
        src: 'html/dev/**/*.html',
        dest: 'html/view/',
    },
    styles: {
        src: 'styles/sass/**/*',
        sass: 'styles/sass/styles.scss',
        dest: 'styles/css/',
    },
    scripts: {
        src: 'js/**/*.js'
    },
    fonts: {
        src: 'styles/fonts/**/*',
    },
    images: {
        src: 'styles/images/**/*.{jpg,jpeg,png,svg}',
        dest: 'dist/images/',
    },
}

// Fn
const clean = () => del(Paths.views.dest).then(files => console.log(`Delete ${files}`))
export { clean }


// Views
// ？？？整合一个html文件查阅所有html页面及对应路径、title值；方便查阅；
export function views() {
    return gulp.src(Paths.views.src)
        .pipe(Pi.htmlExtend())
        .pipe(Pi.plumber())
        .pipe(gulp.dest(Paths.views.dest))
}
// Sass
export function sass() {
    return gulp.src(Paths.styles.sass)
        .pipe(Pi.changed(Paths.styles.dest))
        .pipe(Pi.sass({
            outputStyle: 'expanded',
            // onerror?
        }).on('error', Pi.sass.logError))
        .pipe(Pi.autoprefixer({
            browsers: ['> 1%', 'IE 7'],
            cascade: false,
        }))
        .pipe(gulp.dest(Paths.styles.dest))
        .pipe(Pi.cleanCss())
        .pipe(Pi.rename(path => path.basename += '.min'))
        .pipe(gulp.dest(Paths.styles.dest))
        .pipe(reload({ stream: true }))
}

// Server
export function server(next) {
    browserSync.init({
        server: {
            baseDir: './'
        }
        // proxy: '代理域名/IP', // 二选一
    })
    next();
}
//
export function bsReload(next) {
    reload()
    next()
}

// Watch
export function watch() {
    gulp.watch(Paths.views.src, gulp.series(views, bsReload))
    gulp.watch(Paths.styles.src, sass)
    gulp.watch(Paths.scripts.src, bsReload)
    gulp.watch(Paths.images.src, bsReload)
    gulp.watch(Paths.fonts.src, bsReload)
}

// Tasks
const build = gulp.series(clean, gulp.parallel(views, sass))
export { build }

const dev = gulp.parallel(build, server, watch)
export { dev }

// Default
export default dev
