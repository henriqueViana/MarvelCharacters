const gulp = require('gulp');
const util = require('gulp-util');
const sequence = require('run-sequence');

require('./gulpTasks/app');
require('./gulpTasks/webserver');

gulp.task('default', () => {
    if(util.env.production) {
        sequence('app');
    } else {
        sequence('app', 'webserver');
    }
});
