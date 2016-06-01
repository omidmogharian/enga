class MyCtr2 {
	constructor($scope, $routeParams, version) {
		$scope.name = $routeParams.name;
		$scope.version = version;
	}
}

export default MyCtr2