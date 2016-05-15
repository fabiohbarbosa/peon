'use strict';

var YAML = require('yamljs');
var configuration = YAML.load('config/configuration.yaml');

var project = configuration.project;
var frontEnd = configuration.frontEnd;

// to use debug set DEBUG environment
var debug = require('debug')(project.name);

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var argv = require('yargs').argv;
var rename = require('gulp-rename');
var ngConstant = require('gulp-ng-constant');
var removeHtmlComments = require('gulp-remove-html-comments');
var ejs = require("gulp-ejs");

gulp.task('frontend:server', ['build', 'watch', 'common:jshint'], function() {
  gulp.start('browserSync');
  debug("Server started");
});

gulp.task('browserSync', function() {
  return browserSync.init({
    open: false,
    notify: true,
    port: frontEnd.port,
    server: {
      baseDir: frontEnd.baseDir
    }
  });
});

gulp.task('watch', ['watch:index', 'watch:html', 'watch:css', 'watch:js']);

gulp.task('watch:index', function() {
  watchFile('config/templates/index.html.tpl', ['inject', 'browserSyncReload']);
});

gulp.task('watch:js', function() {
  watchFile(frontEnd.baseDir + '**/*.js', ['inject', 'common:jshint']);
});

gulp.task('watch:html', function() {
  watchFile(frontEnd.baseDir + '**/*.html', ['browserSyncReload']);
});

gulp.task('watch:css', function() {
  watchFile(frontEnd.baseDir + '**/*.css', ['inject']);
});

function watchFile(source, afterTasks) {
  watch(source, batch(function(events, done) {
    gulp.start(afterTasks, done);
  }));
}

gulp.task('browserSyncReload', function() {
  browserSync.reload();
});

gulp.task('inject', function() {
  var options = {
    read: false,
    ignorePath: frontEnd.baseDir,
    addRootSlash: false
  };

  var wiredepOptions = {
    directory: frontEnd.baseDir + 'bower_components/',
    ignorePath: '../../' + frontEnd.baseDir
  };

  var sources_js = ['!' + frontEnd.baseDir + 'bower_components/**/*.js', frontEnd.baseDir + '**/*.js'];
  var sources_css = ['!' + frontEnd.baseDir + 'bower_components/**/*.css', frontEnd.baseDir + '**/*.css'];

  var ejsOptions = {
    projectName: project.name
  };

  return gulp.src('config/templates/index.html.tpl')
    .pipe(ejs(ejsOptions))
    .pipe(inject(gulp.src(sources_js), options))
    .pipe(inject(gulp.src(sources_css), options))
    .pipe(wiredep(wiredepOptions))
    .pipe(removeHtmlComments())
    .pipe(rename('index.html'))
    .pipe(gulp.dest(frontEnd.baseDir));
});

gulp.task('build', ['build:constants:default', 'build:constants:profile'], function() {
  gulp.start('inject');
});

gulp.task('build:constants:default', function() {
  var options = {
    name: project.name + '-constants-default',
    constants: {
      debugEnabled: enableDebug()
    },
    templatePath: 'config/constants/custom-constants.tpl.ejs'
  };

  var configFolder = 'config/constants/default/';

  return gulp.src(configFolder + '/default-constants.yaml')
    .pipe(ngConstant(options))
    .pipe(rename('constants-default.js'))
    .pipe(gulp.dest(frontEnd.baseDir + 'config/'));
});

gulp.task('build:constants:profile', function() {
  var profile = getProfile();

  var options = {
    name: project.name + '-constants-profile',
    templatePath: 'config/constants/custom-constants.tpl.ejs'
  };

  var configFolder = 'config/constants/profile/';
  return gulp.src(configFolder + profile.toLowerCase() + '-constants.yaml')
    .pipe(ngConstant(options))
    .pipe(rename('constants-profile.js'))
    .pipe(gulp.dest(frontEnd.baseDir + 'config/'));
});

function getProfile() {
  var profile = argv.p || argv.P;
  if (!profile) {
    profile = 'local';
  }
  if (profile !== 'local' && profile !== 'dev' && profile !== 'qas' && profile !== 'prod') {
    debug("Invalid profile '%s'", profile);
    process.exit();
  }
  return profile;
}

function enableDebug() {
  var debugEnabled = false;
  var envDebug = process.env.DEBUG;
  if (envDebug && envDebug.indexOf(project.name) >= 0) {
    debugEnabled = true;
  } else {
    debugEnabled = false;
  }
  return debugEnabled;
}
