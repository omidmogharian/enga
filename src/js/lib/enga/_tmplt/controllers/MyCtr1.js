class MyCtr1 {
	constructor($scope, CalculatorService) {
		$scope.answer = CalculatorService.square(2);
	}
}

export default MyCtr1