var gulp = require('gulp'),
    path = require('path'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    del = require('del'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon');
    runSequence = require('run-sequence'),  
    gutil = require('gulp-util'),  

// const    
    TGT_DIR = 'dist',
    TGT_DIR_LIBS = path.join(TGT_DIR,'libs'),
    TGT_BIN = path.join(TGT_DIR, 'bin/www'),
    
    SRC_DIR = 'src',
    SERVER_TSCONF = path.join(SRC_DIR, 'server', 'tsconfig.json'),
    SERVER_SRC_TS = path.join(SRC_DIR, 'server', '**', '*.ts'),
    SERVER_SRC_BIN = path.join(SRC_DIR, 'server', 'bin', '**', '*'), 
    CLIENT_SRC_ASSETS = path.join(SRC_DIR, 'client', '**', '*.{html,css}'), 
    CLIENT_TSCONFIG = path.join(SRC_DIR, 'client', 'tsconfig.json'),
    CLIENT_SRC_TS = path.join(SRC_DIR, 'client', '**', '*.ts'),
    CLIENT_JSNPM_DEPS = [
        'angular2/bundles/angular2-polyfills.js',
        'systemjs/dist/system.src.js',
        'rxjs/bundles/Rx.js',
        'angular2/bundles/angular2.dev.js',
        'angular2/bundles/router.dev.js'
    ];


// CLIENT
gulp.task('client:assets', function(){
    var mappedPaths = CLIENT_JSNPM_DEPS.map(function (file) {return path.resolve('node_modules', file);}),
    
        //Let's copy our head dependencies into a dist/libs
        copyCLIENT_JSNPM_DEPS = gulp.src(mappedPaths, {base:'node_modules'})
        .pipe(gulp.dest(TGT_DIR_LIBS)),
     
        //Let's copy our assets into dist   
        copyIndex = gulp.src(CLIENT_SRC_ASSETS)
        .pipe(gulp.dest(TGT_DIR));
        
    return [copyCLIENT_JSNPM_DEPS, copyIndex];
});

gulp.task('client:app', function(){
    var tsProject = ts.createProject(CLIENT_TSCONFIG),
        tsResult = gulp.src(CLIENT_SRC_TS)
		.pipe(sourcemaps.init())
        .pipe(ts(tsProject));
        
	return tsResult.js
        .pipe(sourcemaps.write()) 
		.pipe(gulp.dest(TGT_DIR));
});

gulp.task('client', ['client:app', 'client:assets']);


// SERVER
gulp.task('server:app', function () {
	var tsProject = ts.createProject(SERVER_TSCONF),
        tsResult = gulp.src(SERVER_SRC_TS)
		.pipe(sourcemaps.init())
        .pipe(ts(tsProject));
	return tsResult.js
        .pipe(sourcemaps.write()) 
		.pipe(gulp.dest(TGT_DIR));
});

gulp.task('server:bin', function () {
    return gulp.src(SERVER_SRC_BIN)
        .pipe(gulp.dest(path.join(TGT_DIR,'bin')));
});

gulp.task('server', ['server:app', 'server:bin']);


// ALL
gulp.task('all', ['client', 'server']);


// GENERAL
gulp.task('clean', function(){
    return del(TGT_DIR);
});

gulp.task('build', ['clean'], function(){
    return gulp.start('all');
});

gulp.task('default', ['build']);


// RUN and WATCH
gulp.task('demon', function () {
    return nodemon({
        script: TGT_BIN,
        watch: TGT_DIR,
        delay: 200, // 200 millis to avoid to much restarts while rebuilding is going on
        ext: 'js',
        env: {
            'NODE_ENV': 'development'
        }
    })
    .on('start', function() {
        gutil.log(gutil.colors.green('[gulp-nodemon] started'));
    })
    .on('change', function() {
        gutil.log(gutil.colors.green('[gulp-nodemon] change event'));
    })
    .on('restart', function () {
        gutil.log(gutil.colors.green('[gulp-nodemon] restarted!'));
    })
    .on('crash', function () {
        gutil.log(gutil.colors.red('[gulp-nodemon] has crashed!'));
    })
    .on('exit', function () {
        gutil.log(gutil.colors.green('[gulp-nodemon] is done!'));
    });
});

gulp.task('watch:client-app', function () {
    // watch app    --> build app    + restart
    return gulp.watch(CLIENT_SRC_TS, ['client:app']);
});
gulp.task('watch:client-assets', function () {
    // watch assets --> build assets + restart
    return gulp.watch(CLIENT_SRC_ASSETS, ['client:assets']);
});
gulp.task('watch:server', function () {
    // watch server --> build server + restart
    return gulp.watch(SERVER_SRC_TS, ['server']);
});
gulp.task('watch', ['watch:server', 'watch:client-assets', 'watch:client-app']);

gulp.task('serv', function (callback) {
    return runSequence(['all', 'watch', 'demon'], callback);
});


// EXIT ON CTRL-C WHEN watch or serve
process.once('SIGINT', function(){
    process.exit(0);
});