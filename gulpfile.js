var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var argv = require('yargs').argv;


var tsProject = ts.createProject('tsconfig.json');

gulp.task('compile', function () {
  var tsResult = tsProject.src()
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('sync-database', function () {
  var models = require('./dist/server/models');
  var options = {};
  if (argv.force) {
    options = {
      force: true
    };
  }

  return models.sequelize.sync(options).then(function () {
    console.log('Tabelas sincronizadas', options);
    process.exit();
  });
});


gulp.task('copy-opts', ['clean', 'compile'], function () {
  gulp
    .src('tests/unit/config/mocha.opts')
    .pipe(gulp.dest('dist/tests/unit/config'));

  return gulp
    .src('tests/integration/config/mocha.opts')
    .pipe(gulp.dest('dist/tests/integration/config'));
});

gulp.task('watch', ['compile'], function () {
  gulp.watch('server/**/*.ts', ['scripts']);
  gulp.watch('server/*.ts', ['scripts']);
});

gulp.task('default', ['copy-opts']);