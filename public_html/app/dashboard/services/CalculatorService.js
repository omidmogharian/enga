define(function () {
	var srv = function(MathService) {
     
    	this.square = function(a) { MathService.multiply(a,a); };
    	this.cube = function(a) { return MathService.multiply(a, MathService.multiply(a,a)); };
 
	};
	return srv;
});