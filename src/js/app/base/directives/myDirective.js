/**
*
* @class MyDirective
*/
class MyDirective {
    /**
    * Constructor for "MyDirective" class
    * @class MyDirective
    * @constructor
    */
    constructor() {
    	
        this.template = '<div>I\'m a directive! {{collection}}</div>'; 
        /**
        * @property replace
        * @type Boolean
        */
        this.replace= true
        /**
        * @property restrict
        * @type String
        */
        this.restrict = 'AE'; 
        /**
        * @property scope
        * @type scope
        */ 
        this.scope = {
            collection: '@',
        } 
    } 
    /**
    *              
    * @class MyDirective
    * @method link
    * @param scope The directive scope                                            
    * 
    */
    link(scope) {  
    }
}
export default MyDirective