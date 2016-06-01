
import jsonRpcClient from 'jsonRpcClient'
import WCookies from "wCookies"

class jsonRpcAbstract extends jsonRpcClient {

  constructor(serviceUrl, module="" , access_token=null){
    super(serviceUrl,module);
    if (access_token) {
      this.header= {"accessToken":access_token};
    }
  }
  set accessToken(ac){
    this.header= {"accessToken":ac};
  }

  call(method=null,params=null, check_access_token=true) {
    let access_token =  WCookies.getItem('access_token');
    if (!access_token && check_access_token)
      throw "access_token is expired!";
    this.accessToken = access_token;
    return super.call(method,params);
  }
}

export  default  jsonRpcAbstract
