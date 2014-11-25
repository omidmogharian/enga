define(['lib/dmg/enga/helper','lib/dmg/enga/Module'],function (Helper,Module) {
	'use strict';

	var enga = {};

	var APP_PAtH = "app/", 
		CONFIG_FILE='config.json', 
		BASE_MODULE_NAME = 'base';

	var modules,
		mainCallback,
		current=-1,
		appName,
		appInject;
	
	// enga Factorry setup all stuf for angularjs app
	enga.factory = function (name,load,inject,callback) {

		modules = load;
		mainCallback = callback;
		appName = name;
		appInject	=inject;
		// add base module if is availabe and continue by _syncload
		_resolveBaseModule(_syncload);	
	};

	var _syncload = function() {
		// next module
		if(current < modules.length-1) {
			current++;
			var cPath  = APP_PAtH +_getCurentModuleName()+ '/'+ CONFIG_FILE;
			_moduleSetup(cPath);
			
		}
		else {
			var ng = require('angular');
			var app = ng.module(appName, appInject);
			Promise.all([mainCallback(app)])
			.then(function(){
				ng.bootstrap(document, [app.name]);
			});
		}

	};
	
	var _moduleSetup = function (configPath,load) {
		
		load || (load = []);
		(configPath)? load.unshift('text!'+configPath): load.unshift('text!./' + CONFIG_FILE);
		load.unshift('angular');
		

		require(load,function(ng,config){
		
			var configObj = JSON.parse(config);
			
			// check if mainfile of module {mouleName}.js file if is availabe and continue by _moduleInitilize
			_resolveModuleFile(configObj.name,_moduleInitilize,ng,configObj);
			
			//var inputs=[].slice.apply(arguments);
		})
	};

	var _moduleInitilize = function(ng, config,mainFilePath) {
		if (typeof config == 'string') config = JSON.parse(config);
		
		var basePath= APP_PAtH + _getCurentModuleName()+'/';
		var loadPaths = Helper.extractPath(config.configuration,basePath);
		config.basePath = basePath;
		if(mainFilePath) loadPaths.unshift(mainFilePath);
		
		var ngmodule = ng.module(config.name,[]);
		require(loadPaths,function(){

			var moduleObject;
			if(mainFilePath) {
				var loadedClass= require(mainFilePath);
				Object.inherit(loadedClass,Module);
				moduleObject = new loadedClass();	
				moduleObject.setProperties(config);
			}
			
			else {
				moduleObject = new Module(config);
			}
			
			Promise.all([
				moduleObject.setNgModule(ngmodule),
				moduleObject.init()
			])
			.then(moduleObject.postInit)
			.then(_syncload);
		});				
	};

	var _getCurentModuleName = function() {
		return modules[current].replace(/\./g,'/');
	};

	var _resolveModuleFile = function  (moduleName,continueHandler,arg1,arg2) {
		var path = APP_PAtH + _getCurentModuleName() + '/' + moduleName + '.js';
		Helper.fileExist(path,
			function(){
				continueHandler(arg1,arg2,path);
			},
			function(err){
				continueHandler(arg1,arg2);
			});
		
	};

	var _resolveBaseModule = function  (continueHandler) {
		if(modules.indexOf('base')==-1){
			Helper.fileExist( APP_PAtH + BASE_MODULE_NAME + '/' + CONFIG_FILE,
				function(){
					modules.unshift('base');
					appInject=  appInject.concat(modules);
					continueHandler();
				},
				function(err){
					appInject=  appInject.concat(modules);
					continueHandler();
				});
		}
		else{
			appInject=  appInject.concat(modules);
			continueHandler();
		}
	};

	ns.dmg || (ns.dmg ={});
	return ns.dmg.enga = enga;

});