'use strict';

module.exports = function(config) {
    var configuration = {

        basePath: '../',


        frameworks: ['jasmine'],

        files: [

            'node_modules/systemjs/dist/system.src.js',

            { pattern: 'test/**/*.spec.js', included: false, watched: true },
            { pattern: 'src/**/*.js', included: false, watched: true },
            { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false },


            'test/test-main.js'
        ],

        exclude: [
        ],

        reporters: ['dots'],

        port: 9877,

        colors: true,

        logLevel: config.LOG_INFO, // it must show WARN for them to be caught in ci. see build script.
        autoWatch: true,

        browsers: [
            'Chrome'
        ],

        singleRun: true
    };

    config.set(configuration);
};
