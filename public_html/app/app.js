define(['enga'],function(eana){

	eana.factory (
	/* Angular AppName  */
	'angular_skelton',
	/* Modules list (load synchronize) if base/confing.json is available base module will be added automaticly */
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


