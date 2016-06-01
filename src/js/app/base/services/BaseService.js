import Bridge from 'bridge'
import {countries} from './baseData'



class BaseService {
    constructor() {
        this.bridge = new Bridge()
    }

    get countries() {
        return countries;
    }
}

export default BaseService
