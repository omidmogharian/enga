/**
* @class Bridge
* Its a bridge for adapters
* 
*/
class Bridge {
	/**
	* @class Bridge
	* @constructor
	* 
	*/
	constructor(adapter = null) {
		if (Bridge.intance && this.adapter == adapter) {
			return Bridge.intance;
		}
		/**
		* @property adapter
		* @type Object
		*/
		this.adapter = (adapter || this.adapter);
		this._buildPrototype();
		Bridge.intance = this;
		return this;
	}
	/**
	* @method _buildPrototype
	* 
	*/
	_buildPrototype() {
		for (var key in this.adapter) {
			
			var cfunc = this.adapter[key];
			/**
			* here will Mock first adapter,if its empty it will go for second one.
			*/
			if (Array.isArray(cfunc) ) {
				
				cfunc = (!window.MOCKING && cfunc[0]  ) ? cfunc[0] : cfunc[1]
			}

			Bridge.prototype[key] = cfunc;
		}
	}
}

export default Bridge

