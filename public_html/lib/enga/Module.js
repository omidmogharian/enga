define(function () {

	function Module(properties) {
		
		this._properties = properties;
	}

	Module.prototype.init = function init() {

		ngmodule = this.getNgModule();
		var self = this;
		//register route
		ngmodule.config(function($routeProvider) {
		  for (var r  in self._properties.route) {
		  	var fixedRoute = '/'+self._properties.name+r;
		  	if(r == "otherwise") fixedRoute =null;
		  	if(self._properties.route[r].redirectTo) {
		  		$routeProvider.when(fixedRoute,{redirectTo: self._properties.route[r].redirectTo});
		  	}
		  	if(self._properties.route[r].templateUrl){
		  		$routeProvider.when(fixedRoute, {templateUrl: self._properties.basePath+self._properties.route[r].templateUrl, controller: self._properties.route[r].controller});
		  	}
		  }
		});

		//register Configuration
		var  csdf = self._properties.configuration
		for (var node  in csdf) {
			if (csdf[node] instanceof Object){
				for (var item in csdf[node]) {
					var  registerStm, rawStm = csdf[node][item];
					if(rawStm instanceof Array) {
						rawStm[rawStm.length-1]= require(self._properties.basePath+rawStm[rawStm.length-1]);
						registerStm =rawStm;
					}
					else{
						var func = require(self._properties.basePath+rawStm);
						registerStm = func;
					} 
					ngmodule[node](item,registerStm);
				}
			}		
		}
		return this;
	};

	Module.prototype.postInit =function postInit() {
		return this;
	};

	Module.prototype.setNgModule = function setNgModule(ngModule) {
		this.ngModule = ngModule;
		return this;
	};

	Module.prototype.getNgModule = function getNgModule(ngModule) {
		return this.ngModule;
	};

	Module.prototype.getProperty = function getProperty (argument) {
		if(key in this._properties) {
			return this._properties[key];
		}
		return null;
	}
	Module.prototype.setProperties = function setProperties (properties) {
		
		this._properties=properties;
		return this;
	}

	ns.dmg || (ns.dmg ={});
	ns.dmg.eana || (ns.dmg.eana ={});
	return ns.dmg.eana.Module = Module;
});