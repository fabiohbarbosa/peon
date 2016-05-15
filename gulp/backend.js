'use strict';

var YAML = require('yamljs');
var configuration = YAML.load('config/configuration.yaml');

var frontEnd = configuration.frontEnd;

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('backend:server', function(cb) {
  var started = false;

  return nodemon({
    script: 'server.js',
    ignore: [
      frontEnd.baseDir + '**/*.js',
      'gulp/**/*.js',
			'gulpfile.js',
    ]
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  });
});
