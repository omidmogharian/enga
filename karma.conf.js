module.exports = function (config) {
  'use strict';
  config.set({

    basePath: '',

    frameworks: ['mocha', 'chai'],

    files: [
      'test/*.js'
    ],

    exclude: [],

    reporters: ['progress'],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,

    logLevel: config.LOG_INFO,

    browsers: ['Chrome'],

    plugins: [
      'karma-chai',
      'karma-mocha',
      'karma-chrome-launcher'
    ]

  });
};
