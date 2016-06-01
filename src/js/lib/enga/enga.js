import angular from 'angular'
import m from './module'
/**
*
* @property APP_PATH
* @type String
* APP_PATH = "app/";
*/
let  TEMPLATE_PATH = 'templates/';
/**
* @class enga
*/
class enga  {
	/**
	 * @class enga
	 * @method factory
	 * @static 
	 * @param app {}
	 * @param dataBridge {}
	 * @param dependencyList {Array}
	 *
	 * Sets all stuf for angularjs app up!
	 */
	static factory (app, dataBridge, dependencyList = []) {
		for (var i = 0; i < app.modules.length; i++) {
			/**
			*
			* intantsiate module
			*/
			if (typeof app.modules[i] !== "object") {
				var moduleObj= _moduleBuilder(app.modules[i], dataBridge)
				/**
				* set up module
				*/
				_setupModule(moduleObj);
				/**
				* push the module name to depndencies
				*/
				dependencyList.push(moduleObj.getProperty('name'));
			}
		}
		let ngapp = angular.module(app.name, dependencyList);
		ngapp.run(function($rootScope){
			 $rootScope.templater = function (path) {
        		return TEMPLATE_PATH+path
       		}
		});
			(app.main ? app.main(ngapp) : true )
			angular.bootstrap(document, [ngapp.name]);
	}
};
/**
*  @class enga
 * @method _moduleBuilder
 * @private
 * @param moduleClass
 * @param dataBridge
 *
 * To instantiate and perform preinit function
 */
function _moduleBuilder(moduleClass, dataBridge) {
	var moduleObj = new moduleClass();
	/**
	* set bridge
	*/
	moduleObj.setBridge(dataBridge);
	/**
	* call the preInit and then setup module
	*/
	moduleObj.preInit();
	return moduleObj;
};
/**
 * @class enga
 * @method _setupModule
 * @private
 * @param module
 *
 * Sets each module up!
 */
function _setupModule (module) {
	if (module) {
		module.setProperty('templatePath', TEMPLATE_PATH ); ///+ module.getProperty('name') + '/'
		var ngmodule = angular.module(module.getProperty('name'), []);
			module.setNgModule(ngmodule),
			module.init()
				module.postInit();
	}
};
let Module = m;
export {enga, Module}