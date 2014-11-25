
define(function () {
    'use strict';
    var helper = {};
    helper.fileExist = function(path,trueCallback,falseCallback) {
		require(['text!'+path], trueCallback , falseCallback);
	};

	helper.extractPath = function(obj,basePath) {
		var files = [];
		for (var node  in obj) {
			if (obj[node] instanceof Object)
				for (var item in obj[node]) {
					var val =obj[node][item]
					if(val instanceof Array) {
						files.push(basePath+val[val.length-1])	
					}
					else {
						files.push(basePath+val);
					}
				}
		};
		return files;
	};
   
    return helper;

});