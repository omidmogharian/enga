(function(window, Array, Math) {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	 
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	 
	// MIT license
	 
	RegExp.escape = function( value ) {
	     return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}

	if(!String.prototype.trim) {
		String.prototype.trim = function trim(chars) {
			return this.rtrim(chars).ltrim(chars);
		}
	}

	var ltrimRegex = /^\s+/;
	if(!String.prototype.ltrim) {
		String.prototype.ltrim = function ltrim(chars) {
			return this.replace(undefined === chars ? ltrimRegex : new RegExp('^[' + RegExp.escape(chars) + ']+'), '');
		}
	}

	var rtrimRegex = /\s+$/;
	if(!String.prototype.rtrim) {
		String.prototype.rtrim = function rtrim(chars) {
			return this.replace(undefined === chars ? ltrimRegex : new RegExp('[' + RegExp.escape(chars) + ']+$'), '');
		}
	}

	if(!String.prototype.ucFirst) {
		String.prototype.ucFirst = function ucFirst() {
			return this.substr(0, 1).toUpperCase() + this.substr(1);
		}
	}

	if(!String.prototype.lcFirst) {
		String.prototype.lcFirst = function lcFirst() {
			return this.substr(0, 1).toLowerCase() + this.substr(1);
		}
	}

	if(!String.prototype.repeat) {
		String.prototype.repeat = function repeat(times) {
			if(times <= 0) return '';
			if(times === 1) return this;
			var result = '', temp = this;
			while(times > 0) {
				if(times & 1) result += temp;
				if(times >>= 1) temp += temp;
			}
			return result;
		}
	}

	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());
	
	if(undefined === window.setImmediate) {
		window.setImmediate = function setImmediate(func) {
			var args = Array.prototype.slice.call(arguments);
			args.splice(1, 0, 0);
			return window.setTimeout.apply(window, args);
		};

		window.clearImmediate = function clearImmediate(id) {
			return window.clearTimeout(id);
		}
	}

	// Mozilla bind polyfill
	if (!Function.prototype.bind) {
		Function.prototype.bind = function (oThis) {
			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5 internal IsCallable function
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}
	 
			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP = function () {},
				fBound = function () {
					return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
				};
	 
			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();
	 
			return fBound;
		};
	}
	
	//Refrence: http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
	if(!Array.prototype.unique) {
		Object.defineProperty(Array.prototype, "unique", {
			numerable: false,
			value:function unique() {
			    var o = {}, i, l = this.length, r = [];
			    for(i=0; i<l;i+=1) o[this[i]] = this[i];
			    for(i in o) r.push(o[i]);
			    return r;
			}
		});
	}

	if(!Array.prototype.remove) {
		Object.defineProperty(Array.prototype, "remove", {
		    enumerable: false,
		    value: function remove(index, count) {
		    	undefined === count && (count = 1);
		    	if(typeof index !== 'number') {
		    		index = this.indexOf(index);
		    	}
		    	var l = this.length;
				if(0 === l) {
					return this;
				}
				for (var i = index - 1, c = l - count; ++i <= c;) {
					this[i] = this[i + count];
				}
		    	this.length = c;
			    return this;
		    }
		});
	}

	if(!Array.prototype.equals) {
		Object.defineProperty(Array.prototype, "equals", {
		    enumerable: false,
		    value: function equals(arr, deep) {
		    	if(!(arr instanceof Array)) {
		    		return false;
		    	}
		    	var c = arr.length;
		    	if(this.length !== c) {
		    		return false;
		    	}
		    	for(var i = -1; ++i < c;) {
		    		if(true === deep && arr[i] instanceof Array && this[i] instanceof Array) {
	    				if(!arr[i].equals(this[i], true)) {
	    					return false;
	    				}
	    			} else if(arr[i] !== this[i]) {
	    				return false;
	    			}
		    	}
		    	return true;
		    }
		});
	}

	//Refrence: http://www.shamasis.net/2009/09/fast-algorithm-to-find-unique-items-in-javascript-array/
	if(!Array.prototype.unique) {
		Object.defineProperty(Array.prototype, "unique", {
			numerable: false,
			value:function unique() {
			    var o = {}, i, l = this.length, r = [];
			    for(i=0; i<l;i+=1) o[this[i]] = this[i];
			    for(i in o) r.push(o[i]);
			    return r;
			}
		});
	}	


	if(!Array.prototype.clone) {
		Object.defineProperty(Array.prototype, "clone", {
		    enumerable: false,
		    value: function clone() {
		    	var c = this.length, clone = new Array(c);
		    	for(;--c >= 0;) {
		    		clone[c] = this[c];
		    	}
		    	return clone;
		    }
		});
	}


	if(!Array.prototype.find) {
		Array.prototype.find = function find(fn, ctx) {
			return this.filter(fn, ctx)[0] || null;
		}
	}

	if(!Array.prototype.rotate) {
		Array.prototype.rotate = function rotate(n) {
			this.unshift.apply(this, this.splice(n, this.length))
  			return this;
		}
	}

	Object.defineProperty(Object, "inherit", {
	    enumerable: false,
	    value: function inherit(child, parent, traits) {
			if(parent instanceof Array && undefined === traits) {
				traits = parent;
				parent = undefined;
			}
			var i, c, k;
			if(undefined !== parent) {
				child.prototype = Object.create(parent.prototype);
				child.prototype.constructor = child;
				for(k in parent) {
					child[k] = parent[k];
				}
			}
			if(traits instanceof Array) {
				for(i = -1, c = traits.length; ++i < c;) {
					for(k in traits[i].prototype) {
						child.prototype[k] = traits[i].prototype[k];
					}
					for(k in traits[i]) {
						if('prototype' !== k && '__proto__' !== k)
						child[k] = traits[i][k];
					}
				}
			}
		}
	});

	Object.defineProperty(Object, "values", {
	    enumerable: false,
	    value: function values(obj) {
			var keys = Object.keys(obj),
				i = -1,
				c = keys.length,
				values = new Array(c)

			for(;++i < c;) {
				values[i] = obj[keys[i]];
			}

			return values;
		}
	});

	Object.defineProperty(Object, "path", {
	    enumerable: false,
	    value: function inherit(root, path, sep) {
	    	undefined !== sep || (sep = '.');
			var parts = path.split(sep);

			for(var i = -1, c = parts.length; ++i < c;) {
				root = root[parts[i]];
			}
			return root;
		}
	});

	Object.defineProperty(Object, "clone", {
	    enumerable: false,
	    value: function clone(obj) {
			var clone = Object.create(obj.__proto__);
			clone.__proto__ = obj.__proto__;
			for(var keys = Object.keys(obj), i = -1, c = keys.length; ++i < c;) {
				clone[keys[i]] = obj[keys[i]];
			}
			if('clone' in clone && clone.clone instanceof Function) {
				clone.clone();
			}
			return clone;
		}
	});

	Object.defineProperty(Object, "merge", {
	    enumerable: false,
	    value: function merge(dest, src) {
	    	if(src instanceof Array) {
	    		for(var i = -1, c = src.length; ++i < c;) {
	    			dest.push(src[i]);
	    		}
	    	} else if(({}).toString.call(src) === '[object Object]') {
    			for(var keys = Object.keys(src), i = -1, c = keys.length; ++i < c;) {
    				if(!(keys[i] in dest) || (({}).toString.call(src[keys[i]]) !== '[object Object]') && !(src[keys[i]] instanceof Array)) {
    					dest[keys[i]] = src[keys[i]];
    				} else {
    					Object.merge(dest[keys[i]], src[keys[i]])
    				}
    			}
    		}
		}
	});

	// Object.defineProperty(Object.prototype, "extend", {
	//     	: false,
	//     value: function extend(from) {
	//         var props = Object.getOwnPropertyNames(from);
	//         var dest = this;
	//         props.forEach(function(name) {
 //                var destination = Object.getOwnPropertyDescriptor(from, name);
 //                Object.defineProperty(dest, name, destination);
	//         });
	//         return this;
	//     }
	// });

	Object.defineProperty(Object.prototype, "keyOf", {
	    enumerable: false,
	    value: function inherit(value) {
	    	for(var keys = Object.keys(this), i = -1, c = keys.length; ++i < c;) {
	    		if(this[keys[i]] === value) {
	    			return keys[i];
	    		}
	    	}
			return false;
		}
	});

	var _regex = /{{(\w+)}}/g;
	String.prototype.interpolate = function interpolate(values, regex) {
		regex || (regex = _regex);
		return this.replace(regex, function(match, key) {
			return key in values ? values[key] : match;
		});
	};

	String.prototype.hash = function hash() {
		var hash = 1;
		for(var i = -1, c = this.length; ++i < c;) {
			hash *= this.charCodeAt(i);
			hash &= 0xFFFFFFFFFF;
		}
		return hash;
	}


	var $rand = Math.random;

	Math.random = function random(min, max) {
		if(undefined === max) {
			max = min;
			min = 0;
		}
		if(undefined === max) {
			return $rand();
		}

		return Math.floor($rand() * (max - min + 1)) + min;
	};

	Math.between = function between(value, min, max) {
		return min > value ? min : (max < value	? max : value);
	};

	Math.round2 = function round2(number, digits) {
		if(undefined === digits || 1 === digits) {
			return (number + (number < 0 ? -.5 : .5)) | 0
		}

		return ((number/digits + (number < 0 ? -.5 : .5) | 0)) * digits;
	}

	Math.min2 = function min2(a, b) {
		return a < b ? a : b;
	};

	Math.max2 = function max2(a, b) {
		return a > b ? a : b;
	};

	Math.floor2 = function floor2(number) {
		return number | 0;
	};

})(window, window.Array, window.Math);