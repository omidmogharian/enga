import MyCtr1 from './controllers/MyCtr1'
import MyCtr2 from './controllers/MyCtr2'
import CalculatorService from './services/CalculatorService'

var config = {
	'name': '{{tmplt}}',
	'configuration': {
		'controller': {
			'MyCtrl1': ['$scope', 'CalculatorService', 'version', MyCtr1],
			'MyCtrl2': MyCtr2
		},
		'service': {
			'MathService': 'services/MathService',
			'CalculatorService': CalculatorService
		}
	},
	'route': {
		'/': {
			'templateUrl': 'templates/partial1.html',
			'controller': 'MyCtrl1'
		},
		'/view1': {
			'templateUrl': 'templates/partial1.html',
			'controller': 'MyCtrl1'
		},
		'/view2/:name?': {
			'templateUrl': 'templates/partial2.html',
			'controller': 'MyCtrl2'
		},
		'otherwise': {
			'redirectTo': '/{{tmplt}}/view2'
		}
	}
};

export default config;