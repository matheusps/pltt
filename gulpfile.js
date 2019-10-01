'use strict'

const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')

const serverConfig = {
  server: {
    baseDir: './docs',
    index: 'index.html',
  },
  port: 8080,
  open: false,
}

const sassConfig = {
  outputStyle: 'nested',
  precision: 3,
  errLogToConsole: true,
}

const compileSass = () =>
  gulp
    .src('src/pltt.sass')
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('docs'))

const watch = done => {
  gulp.watch('./src/**/*.sass', compileSass)
  done()
}

const server = done => {
  browserSync.init(serverConfig)
  done()
}

exports.build = gulp.series(compileSass)
exports.default = gulp.series(compileSass, watch, server)
