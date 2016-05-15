'use strict';

var gulp = require('gulp');

require('./gulp/backend');
require('./gulp/common');
require('./gulp/frontend');

gulp.task('default', ['server']);
gulp.task('server', ['frontend:server', 'backend:server']);
