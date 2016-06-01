import MathService from './MathService'

class CalculatorService {
	constructor() {
		this.math = new MathService()
	}

	square(a) {
		return this.math.multiply(a, a);
	}

	cube(a) {
		return this.math.multiply(a, MathService.multiply(a, a));
	}
}

export default CalculatorService