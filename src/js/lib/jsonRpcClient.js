/**
* @class jsonRpcClient
* Its a wrapper around JQuery AJAX
* After setting request url based on service url 
* and module it will perform JASON RPC request
*
*/
class jsonRpcClient {
    /**
    * @class jsonRpcClient
    * @constructor
    * @param serviceUrl {}
    * @param module {String}
    */
    constructor(serviceUrl, module="" ) {
        /**
        * @property serviceUrl
        * @type String
        */
        this.serviceUrl = serviceUrl;
        /**
        * @property request
        * @type Object
        */
        this.request= {};
        /**
        * @property request.url
        * @type String
        */
        this.request.url = this.serviceUrl+'/'+module;
        /**
        * @property request.headers
        * @type Object
        */
        this.request.headers= {};
        /**
        * @property request.crossDomain
        * @type Boolean
        */
        this.request.crossDomain = true;
        /**
        * @property request.contentType
        * @type String
        */
        this.request.contentType= "application/json";
        /**
        * @property request.dataType
        * @type String
        */
        this.request.dataType= "json";
        /**
        * @property request.method
        * @type String
        */
        this.request.method = "POST";
        /**
        * @property request.type
        * @type String
        */
        this.request.type = "POST";
        /**
        * @property data
        * @type Object
        */
        this.data={};
        /**
        * @property data.method
        * @type String
        */
        this.data.method = "";
        /**
        * @property data.params
        * @type Object
        */
        this.data.params = {};
        /**
        * @property data.id
        * @type Number
        */
        this.data.id = 1;
        /**
        * @property data.jsonrpc
        * @type String
        */
        this.data.jsonrpc = "2.0";
    }
    /**
    * @method set module
    * @param m {String}
    */
    set module(m){
         this.request.url = this.serviceUrl+'/'+ m;
    }
    /**
    * @method set header
    * @param h {Object}
    */
    set header(h){
         this.request.headers= h;
    }
    /**
    * @method set method
    * @param m {String}
    */
    set method(m) {
        this.data.method = m;
    }
    /**
    * @method set params
    * @param p {Object}
    */
    set params(p){
        this.data.params = p;
    }
    /**
    * @method call
    * @param method {String}
    * @param params {Object}
    * @return {Object(promise)}
    */
    call(method=-1,params=-1) {
        if (method!==-1) {
            this.method = method;
        }
        if (params!==-1) {
            this.params = params;
        }
        this.request.data = JSON.stringify(this.data)
        console.log(this.request);
        return window.$.ajax(this.request)
    }
}
export default jsonRpcClient