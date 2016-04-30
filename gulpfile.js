var gulp = require('gulp');
var server = require('gulp-express');

var SOURCES_JS = ['!./node_modules/**/*.js', './**/*.js'];

// Server
gulp.task('server', ['jshint'], function() {
  var watchJs = ['!./node_modules/**/*.js', 'index.js', 'server.js', './api/**/*.js'];
  server.run(['index.js']);

  gulp.watch(watchJs, function(event) {
    gulp.start('server');
    server.notify(event);
  });
});

// JShint
var jshint = require('gulp-jshint');
gulp.task('jshint', function () {
    return gulp.src(SOURCES_JS)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('default', ['server']);
