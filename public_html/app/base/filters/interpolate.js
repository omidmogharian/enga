define(function() {
	var fltr = function(version) {
	    return function(text) {
	      return String(text).replace(/\%VERSION\%/mg, version);
	    };
	}
	return fltr;
})