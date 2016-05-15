'use strict';

var YAML = require('yamljs');
var configuration = YAML.load('./config/configuration.yaml');

var project = configuration.project;
var server = configuration.server;
var frontEnd = configuration.frontEnd;

var debug = require('debug')(project.name);

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var ejs = require("gulp-ejs");

gulp.task('common:jshint', function() {
  debug('jshint sources js');
  var sourcesJs = [
    '!' + frontEnd.bowerDir + '**/*.js',
    '!' + server.npmDir + '**/*.js',
    './**/*.js'
  ];
  debug(sourcesJs);
  return gulp.src(sourcesJs)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('make', [
  'templates:index.js',
  'templates:components', 'templates:modules'
]);

gulp.task('templates:index.js', function() {
  var ejsOptions = {
    projectName: project.name,
    constantsDefault: project.name + '-constants-default',
    constantsProfile: project.name + '-constants-profile',
    components: project.name + '-components',
    modules: project.name + '-modules'
  };

  return gulp.src('config/templates/index.js.tpl')
    .pipe(ejs(ejsOptions))
    .pipe(rename('index.js'))
    .pipe(gulp.dest(frontEnd.baseDir));
});

gulp.task('templates:components', function() {
  var ejsOptions = {
    components: project.name + '-components'
  };
  return gulp.src('config/templates/components.js.tpl')
    .pipe(ejs(ejsOptions))
    .pipe(rename('index.js'))
    .pipe(gulp.dest(frontEnd.baseDir + 'components/'));
});

gulp.task('templates:modules', function() {
  var ejsOptions = {
    modules: project.name + '-modules'
  };
  return gulp.src('config/templates/modules.js.tpl')
    .pipe(ejs(ejsOptions))
    .pipe(rename('index.js'))
    .pipe(gulp.dest(frontEnd.baseDir + 'modules/'));
});
