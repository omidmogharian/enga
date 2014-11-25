define(function(){
	var dir = function(version) {
	    return function(scope, elm, attrs) {
	      elm.text(version);
	    }
 	 }
	return dir;

});