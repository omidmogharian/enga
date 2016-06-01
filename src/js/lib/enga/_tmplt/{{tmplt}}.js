import config from './{{tmplt}}.conf'
import {Module} from 'enga'

class {{Tmplt}} extends Module {

 /**
	* @name Module.preInit
	*
	* @description
	* This function will be called before inilizing module .
	* _properties field should be set before in preInit
	*/
  preInit() {
    // fill the this._properties here!!
   	this._properties = this._getConfig();
  }

  /*
	 * @name Module.postInit
	 *
	 * @description 
	 * This function will be called after inilizing module in init function.
	 * with this.getNgModule() you can get the current angular module
	 * this.getProprety('<your property>') brings you have all confing data
	 */
	postInit() {
		return this;
	}

	_getConfig() {
    return config;
  }

}

export default {{Tmplt}}