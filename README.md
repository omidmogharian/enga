enga - Enterprise Architecture for AngularJS
====================================
> ** v0.1 **

This architecture designed to use angular in enterprise module-based projects.

## Main Features
- Use requireJs as module loader
- Provide a standard module-based structure
- Easy to mange routes for each module via config file
- Load configurations (controllers, services, directives, ...) via config file
- Extendable modules
- Completely independante and resuable modules
- Flexible coding (filing) inside of module folder

## enga Structure
*coming soon!*

## Working with module and Config file
*coming soon!*

## Setup your app
easy! in app.js use enga factory with this parameters :
1. Set your app name
2. Add your module named (folder name)
3. Angular Dependencies
4. A callback function for having general and basic stuff!

 ```javascript

	define(['enga'],function(eana){

		eana.factory (
		/* Angular AppName  */
		'angular_skelton',
		/* Modules list (load synchronize) | if base/confing.json is available base module will be added automaticly| */
		['dashboard'],
		/* Angular Dependencies */
		['ngRoute','ngAnimate','AngularAOP','angular-loading-bar'],
		/* Here is a function with available ng modules */
		function (app) {
			'use strict';

			/* Genearl and final */
			app.value('version', '0.1');

		});
	})
 ``` 
