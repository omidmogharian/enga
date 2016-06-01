import config from './base.conf'
import {Module} from 'enga'
/**
*
*
* @class Base
* @extends Module
*/
class Base extends Module {
	/**
 	* @method preInit
	* This function will be called before inilizing module .
	* properties field should be set before in preInit
	*
	*/
	preInit() {
   	this._properties = this._getConfig();
  	}
  	/*
	 * @method Module.postInit
	 *
	 * This function will be called after inilizing module in init function.
	 * with this.getNgModule() you can get the current angular module
	 * this.getProprety('<your property>') brings you have all confing data
	 *
	 */
	postInit() {
		return this;
	}
	_getConfig() {
    return config;
  }
}
export default Base
