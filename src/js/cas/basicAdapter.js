import sso from './myapi/samplesrvc'
import youtubeApi from './gapi/yotube.js'


/*
 Adapters are key : function registery to servr cas functions with unique inteface
 there are two ways to assign function to a interface key

 1. Simple mode ->  key: <function>
 it roughly makes the the equal to function (could be real or mocker)

 2. Array mode -> key: [<real_func> , <moker_binded_func> ]
 to register the real function and mock function toghether.
 it allows bridge to assign the first function in normal cases and
 when window.MOCKING is true the 2nd function (window.MOCKING can be set in setting.js).
 For the 2nd item of array mockService/mocker can be used

 */


let sampleServer= new jsonRpcVdbtAbstract(window.SAMPLE_SRVC_URL,"auth");

let ytApi = new youtubeApi();



var basicAdapter = {

  ///:::Samples:::
  //test: sso.hey,
  //theOtherTest: [sso.hoy, Mocker.getData.bind({}, 'sso', ['auth', 'login'])],
  // loginSample: Mocker.rpcLikeCall.bind({},'sso','auth','login'),
  // the above line and below line are equal...  it's not recommended to use the below line format. it's unclean a bit!
  // loginSample: function (){ return Mocker.rpcLikeCall('sso','auth','login')},
  // best practice for the situation that we don't have real function is:
  // loginSample: [null, Mocker.rpcLikeCall.bind({}, 'sso', 'auth', 'login',null)],

  login: sampleServer.login.bind({"server": ssoServer}),
  ytSearch: ytApi.ytSearch.bind(ytApi),
  
  


};

export default basicAdapter
