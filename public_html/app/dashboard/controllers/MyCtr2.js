define (function() {

    var ctr = function($scope,$routeParams) { 
		 $scope.name=$routeParams.name;
 	};

	return ctr;

});