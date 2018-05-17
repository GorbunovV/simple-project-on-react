"use strict";

const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const del = require('del');

const sourcePath = './src';
const svgPath = 'svg';
const imagesPath = 'images';

gulp.task('clean',
  del.bind(null, [sourcePath + '/' + imagesPath + '/' + svgPath], {dot: true})
);

gulp.task('svg', function () {
  return gulp.src(sourcePath + '/' + svgPath + '/sprite/**/*.svg')
    .pipe(svgmin())
    .pipe(svgSprite({
      mode: {
        css: {
          "spacing": {
            "padding": 5
          },
          layout: "diagonal",
          dest: "./",
          sprite: sourcePath + '/' + imagesPath + '/svg/sprite.svg',
          bust: false,
          render: {
            scss: {
              dest: sourcePath + '/scss/svg/_sprite.scss',
              template: sourcePath + "/scss/svg/sprite-template.scss"
            }
          }
        }
      }
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('svgInline', function () {
  return gulp.src(sourcePath + '/' + svgPath + '/inline/**/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
        $('title').remove();
        $('style').remove();
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: './',
          example: false,
          bust: false,
          sprite: sourcePath + '/images/svg/spriteInline.svg',
          inline: false,
          render: {
            scss: {
              dest: sourcePath + '/scss/svg/_spriteInline.scss',
              template: sourcePath + "/scss/svg/sprite-template-inline.scss"
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', () => {
  gulp.watch([sourcePath + '/' + svgPath + '/sprite/*.svg'], gulp.series('svg'));
  gulp.watch([sourcePath + '/' + svgPath + '/inline/*.svg'], gulp.series('svgInline'));
});

gulp.task('build', gulp.series(
  gulp.parallel('clean'),
  gulp.parallel('svg', 'svgInline')
));