
/**
 * @class Module
 *
 */
class Module {
  /**
  * @class Module
  * @constructor
  * @param properties
  */
  constructor(properties) {
    this._properties = properties;
  }

  init() {
    var ngmodule = this.getNgModule();
    var self = this;
    /**
    * register route
    */
    ngmodule.config(function ($routeProvider) {
      for (var r in self._properties.route) {
        var fixedRoute = '/' + self.getProperty('name') + r;

        if (r === 'otherwise') {
          fixedRoute = null;
        }

        if (self._properties.route[r].redirectTo) {
          $routeProvider.when(fixedRoute, {redirectTo: self._properties.route[r].redirectTo});
        }

        if (self._properties.route[r].templateUrl) {
          var data = {
            templateUrl: self._properties.templatePath + self._properties.route[r].templateUrl,
            controller: self._properties.route[r].controller
          };
          /**
          * todo:optimize this
          */
          if (self._properties.route[r].controllerAs) {
            data.controllerAs = self._properties.route[r].controllerAs;
          }
          if (self._properties.route[r].resolve) {
            data.resolve = self._properties.route[r].resolve;
          }
          $routeProvider.when(fixedRoute, data);
        }
      }
    });
    /**
    * register Configuration
    */
    var csdf = self._properties.configuration;
    for (var node  in csdf) {
      if (csdf[node] instanceof Object) {
        for (var item in csdf[node]) {
          var registerStm = csdf[node][item];
          registerStm = (node=='factory')? _factory(registerStm) : registerStm;
          registerStm = (node=='directive')? _directive(registerStm,self._properties.templatePath) : registerStm;
          ngmodule[node](item, registerStm);
        }
      }
    }
    return this;
  }
  /**
   * @class Module
   * @method preInit
   *
   * 
   * This function will be called before inilizing module .
   * _properties field should be set before in preInit
   */
  preInit() {
    throw  'NotImplementedError'
  }
  /**
   * @class Module
   * @method Module.postInit
   *
   * 
   * This function will be called after inilizing module in init function.
   * with this.getNgModule() you can get the current angular module
   * this.getProprety('<your property>') brings you have all confing data
   */
  postInit() {
    return this;
  }
  /** 
   * @method setNgModule
   */
  setNgModule(ngModule) {
    this.ngModule = ngModule;
    return this;
  }
  /** 
   * @method getNgModule
   * @param ngModule
   */
  getNgModule(ngModule) {
    return this.ngModule;
  }
  /** 
   * @method setBridge
   * @param bridge
   */
  setBridge(bridge) {
    this.bridge = bridge;
    return this;
  }
  /** 
   * @method getBridge
   * @param bridge
   */
  getBridge(bridge) {
    return this.bridge;
  }
  /** 
   * @method getProperty
   * @param key {key}
   */
  getProperty(key) {
    if (key in this._properties) {
      return this._properties[key];
    }
    return null;
  }
  /** 
   * @method setProperty
   * @param key {String}
   * @param val
   */
  setProperty(key, val) {
    return this._properties[key] = val;
  }
  /** 
   * @method setProperties
   * @param properties
   */
  setProperties(properties) {
    this._properties = properties;
    return this;
  }
}
/** 
* @method _factory
* @param constructorFn
*/
function _factory(constructorFn) {
  constructorFn = _normalizeConstructor(constructorFn);
  return _createFactory(constructorFn);          
}
/** 
* @method _directive
* @param constructorFn
* @param templatePath {String}
*/
function _directive(constructorFn,templatePath="") {

  constructorFn = _normalizeConstructor(constructorFn);

  if (!constructorFn.prototype.compile) {
      /**
      * create an empty compile function if none was defined.
      */
      constructorFn.prototype.compile = () => {};
  }

  var originalCompileFn = _cloneFunction(constructorFn.prototype.compile);
  /**
  * Decorate the compile method to automatically return the link method (if it exists)
  * and bind it to the context of the constructor (so `this` works correctly).
  * This gets around the problem of a non-lexical "this" which occurs when the directive class itself
  * returns `this.link` from within the compile function.
  */
  _override(constructorFn.prototype, 'compile', function () {
      return function () {
          originalCompileFn.apply(this, arguments);

          if (constructorFn.prototype.link) {
              return constructorFn.prototype.link.bind(this);
          }
      };
  });

  return _createFactory(constructorFn,templatePath);
}
/**
 * Convert a constructor function into a factory function which returns a new instance of that
 * constructor, with the correct dependencies automatically injected as arguments.
 *
 * In order to inject the dependencies, they must be attached to the constructor function with the
 * `$inject` property annotation.
 *
 * @param constructorFn
 * @param templatePath {String} 
 * @return {Array.<T>}
 * @private
 */
function _createFactory(constructorFn,templatePath="") {
  /**
  * get the array of dependencies that are needed by this component (as contained in the `$inject` array)
  */
  var args = constructorFn.$inject || [];
  var factoryArray = args.slice(); // create a copy of the array
  /**
  * The factoryArray uses Angular's array notation whereby each element of the array is the name of a
  * dependency, and the final item is the factory function itself.
  */
  factoryArray.push((...args) => {
      /**
      *return new constructorFn(...args);
      */
      var instance = new constructorFn(...args)
      for (var key in instance) {
          instance[key] = instance[key];
      }
      if (instance.templateUrl) 
        instance.templateUrl = templatePath+instance.templateUrl 
      return instance;
  });

  return factoryArray;
}
/**
 * Clone a function
 * @param original
 * @return {}
*/
function _cloneFunction(original) {
  return function() {
      return original.apply(this, arguments);
  };
}
/**
 * Override an object's method with a new one specified by `callback`.
 * @param object
 * @param methodName
 * @param callback
*/
function _override(object, methodName, callback) {
  object[methodName] = callback(object[methodName])
}
/**
 * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
 * we need to pull out the array of dependencies and add it as an $inject property of the
 * actual constructor function.
 * @param input
 * @return {*}
 * @private
*/
function _normalizeConstructor(input) {
    var constructorFn;

    if (input.constructor === Array) {
        //
        var injected = input.slice(0, input.length - 1);
        constructorFn = input[input.length - 1];
        constructorFn.$inject = injected;
    } else {
        constructorFn = input;
    }

    return constructorFn;
  }

export default Module
