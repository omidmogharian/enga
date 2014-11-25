window.ns = window;

define([
    'require',
    'angular',
    'angularRoute',
    'angularAnimate',
    'angularLoadingBar',
    'angularAop',
    'app/app',
], function (require, ng) {

    /*
     * place operations that need to initialize prior to app start here
     */
    
    require(['domReady!'], function (document) {
                           
      // place oprations that need to initialize when dome is ready

    });

    
});