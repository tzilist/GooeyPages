var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync',['styles'], function(){
    browserSync({
        server:'./'
    });
    gulp.watch('client/css/*.css',['styles']);
    gulp.watch(source.html).on('change',reload);
});


// default task allows us to run all tasks at once by just runing `gulp` in command line
gulp.task('default', ['styles', 'browser-sync', 'watch']);
