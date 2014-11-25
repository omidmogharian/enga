define (function() {
	
    var ctr = function($scope,CalculatorService) { 
		$scope.answer = CalculatorService.square(2);	
 	};

	return ctr;

});