require.config({
 
 	// alias libraries paths
     paths: {
         'enga': 'lib/enga/enga',
         'domReady': 'vendor/requirejs-domready/domReady',
         'text': 'vendor/requirejs-text/text',
         'angular': 'vendor/angular/angular',
         'angularRoute':'vendor/angular-route/angular-route',
         'angularAop':'vendor/angular-aop/src/angular-aop',
         'angularAnimate':'vendor/angular-animate/angular-animate',
         'angularLoadingBar':'vendor/angular-loading-bar/src/loading-bar',
         'jQuery':'vendor/jQuery/jquery'
     },
     'waitSeconds' : 45,
 
     // angular does not support AMD out of the box, put it in a shim
     shim: {
         'angular': {
             exports: 'angular'
         },
         'angularRoute':{
        	deps: ['angular'],
            exports: 'ngRoute'
        },
        'angularAop':{
            deps: ['angular'],
            exports: 'AngularAOP'
        },
        'angularAnimate':{
            deps: ['angular'],
            exports: 'ngAnimate'
        },
        'angularLoadingBar':{
            deps: ['angular','angularAnimate'],
            exports: 'angular-loading-bar'
        },
        'jQuery':{
            exports: '$'
        }
     },

     // kick start application
    deps: ['./init']
});
