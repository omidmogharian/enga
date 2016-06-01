/* eslint-disable camelcase, no-sync*/
var gulp = require('gulp');
var debug = require('gulp-debug');
var es6transpiler = require('gulp-es6-transpiler');
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
var browserify = require('browserify');
var es6ify = require('es6ify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var assign = require('lodash.assign');
var browserifyES6Transpiler = require('browserify-es6-transpiler');

//style modules
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var opn = require('opn');
var del = require('del');
//--------------------------------------------------------
//------- Use "gulp default" command to run server--------
//--------------------------------------------------------
var browserifyTimeOut = 2000;
var server = {
  host: 'localhost',
  port: '8001'
};
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
var paths = {
  //all  js files
  scripts: './src/**/**/*.js',
  //ng app files
  appPath: 'src/js/app/',
  //entry point for browserify
  browserifyEntry: './src/js/init.js',
  //output folder
  bundleFolder: 'public/assets/',
  //input of less files
  lessFiles: './src/less/style.less',
  //output for css files
  publicCss: './public/assets/css',
  //output file name
  bundleName: 'bundle.js',
  //build folder
  //buildFolder: '.build/',
  //app folder
  srcFolder: 'src/',
  //source template folder
  srcTemplateFolder: 'src/js/app/**/templates/*',
  //public folder
  publicFolder: './public',
  //public template folder
  publicTemplateFolder: './public/templates/',
  //data for mocking folder
  dataFolder: './_data/',
  // templte Module Folder
  templteModuleFolder: './src/js/lib/enga/_tmplt/'
};

// wrap browserify with watchify!!!
var opts = assign({}, watchify.args, {debug: true});
var b = watchify(browserify(opts));

// Default Task
//gulp.task('default', ['build','webserver','openbrowser','watch']);  // with auto open browser
gulp.task('default', [ 'styles', 'styles2', 'styles3', 'copyPlugins','publicer','browserify','webserver','watch']);    //without auto open browser


gulp.task('build', ['styles', 'styles2', 'styles3','copyPlugins','publicer','browserify:build'], function () {
  gulp.src(paths.publicFolder).pipe(debug());
});


// Watch for changes in files
gulp.task('watch', function () {
  //gulp.watch(['src/**/*.js','!src/js/app/base/*.js','!src/js/lib/*.js'], ['browserify']);
  gulp.watch('src/**/*.{less,css}', ['styles','styles2','styles3']);
  gulp.watch('src/**/*.html',['publicer']);
});

gulp.task('webserver', function() {
  gulp.src( paths.publicFolder )

    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('copyPlugins', function() {
  gulp.src(['vendor/plugins/**/*.*','!vendor/plugins/**/*.{js,map,md,scss,less,html,txt}'])
    .pipe(gulp.dest('public/assets/plugins'));
});


gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});


gulp.task('mixer', function () {
  var folders = getFolders(paths.appPath);
  var m_paths = '';
  var config = 'var modules =[';
  for (var i = 0; i < folders.length; i++) {
    m_paths = m_paths + '\n' + 'import   ' + ucfirst(folders[i]) + ' from "./' + folders[i] + '/' + folders[i] + '"';
    config = config + ucfirst(folders[i]) + ',';
  }

  m_paths = m_paths + '\n' + config + ']' + '\n' + 'export {modules};';
  string_src('app.conf.js', m_paths)
    .pipe(gulp.dest(paths.srcFolder + 'js/app'));

  var dfiles = getFiles(paths.dataFolder);
  var outputd = 'var serviceDataRegistry =  { ' + '\n';

  for (var j = 0; j < dfiles.length; j++) {
    var key = dfiles[j].replace('.json', '');
    var contant = require(paths.dataFolder + dfiles[j]);
    outputd = outputd + '// from ' + paths.dataFolder + dfiles[j] + '\n';
    outputd = outputd + key + ':' + JSON.stringify(contant) + '\n' + ',';
  }

  outputd = outputd + '}' + '\n' + 'export default serviceDataRegistry';

  return string_src('sdr.js', outputd)
    .pipe(gulp.dest(paths.srcFolder + 'js/cas/mockService'));
});

gulp.task('browserify',['mixer'],bundle );
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return  b
    .add(es6ify.runtime)
    .transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
    //.transform(browserifyES6Transpiler)

    .require(require.resolve(paths.browserifyEntry), {entry: true})

    //try to transform all files except node modules from es6 to es5
    //
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))

    //output file name
    .pipe(source(paths.bundleName))
    //show the file names
    .pipe(debug())
    //.pipe(buffer())
    //output file location
    .pipe(gulp.dest(paths.bundleFolder));

}

gulp.task('browserify:build',['mixer'], function () {
  return  browserify()
    .add(es6ify.runtime)
    .transform(es6ify.configure(/^(?!.*node_modules)+.+\.js$/))
    //.transform(browserifyES6Transpiler)

    .require(require.resolve(paths.browserifyEntry), {entry: true})

    //try to transform all files except node modules from es6 to es5
    //
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))

    //output file name
    .pipe(source(paths.bundleName))
    //show the file names
    //.pipe(debug())
    //.pipe(buffer())
    //output file location
    .pipe(gulp.dest(paths.bundleFolder));
});

gulp.task('publicer', function () {
  gulp.src([paths.srcTemplateFolder]).pipe(debug())
    .pipe(gulp.dest(paths.publicTemplateFolder));
});

gulp.task('styles', function() {
  return gulp.src(paths.lessFiles)
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(paths.publicCss))
});

gulp.task('styles2', function() {
  return gulp.src('./src/less/ui.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('ui.css'))
    .pipe(gulp.dest(paths.publicCss))

});

gulp.task('styles3', function() {
  return gulp.src('./src/less/theme.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('theme.css'))
    .pipe(gulp.dest(paths.publicCss))

});

gulp.task('minify', ['styles'], function() {
  return gulp.src(paths.publicCss+'/style.css')
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(paths.publicCss));
});

/*
 * module-generate
 */

var argv = require('yargs').argv;
var rename = require('gulp-rename');
var replace = require('gulp-replace');

gulp.task('genarate-module', function () {
  gulp.src([paths.templteModuleFolder + '**/'])
    .pipe(replace(/{{tmplt}}/g, argv.name))
    .pipe(replace(/{{Tmplt}}/g, ucfirst(argv.name)))
    .pipe(rename(function (fpath) {
      if (fpath.basename.indexOf('{{tmplt}}') !== -1) {
        fpath.basename = fpath.basename.replace('{{tmplt}}', argv.name);
      }
    }))
    .pipe(gulp.dest(paths.appPath + argv.name));
});

gulp.task('lint', function () {
  var eslint = require('gulp-eslint');
  return gulp
    .src(['./src/**/*.js'])
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});


/*
 * Helper functions
 */

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function (file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

function getFiles(dir) {
  return fs.readdirSync(dir)
    .filter(function (file) {
      return fs.statSync(path.join(dir, file)).isFile() && path.extname(file) === '.json';
    });
}

function string_src(filename, string) {
  var Readable = require('stream').Readable;
  var src = new Readable({objectMode: true});
  src._read = function () {
    this.push(new gutil.File({cwd: '', base: '', path: filename, contents: new Buffer(string)}));
    this.push(null);
  };
  return src;
}

function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

