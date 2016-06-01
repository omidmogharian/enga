import serviceDataRegistry from './sdr'
import MockAnswer from './mockanswer.js'
class Mocker {

  static getData(service, keys) {
    return _getData(service, keys)
  }

  static call(service) {
    console.log(service + 'has been called!');
    return true;
  }

  static rpcLikeCall(service, module, method, data = null) {
    if (data) {
      return MockAnswer(_getData(service, [module, method, _paramsStringyfy(data)]));
    }
    return new MockAnswer(_getData(service, [module, method]));
  }

}

function _getData(service, keys) {
  Array.isArray(keys) || ( keys = [keys] );
  if (service in serviceDataRegistry) {
    var sdata = serviceDataRegistry[service];
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] in sdata) {
        sdata = sdata[keys[i]]
      }
      else {
        throw  'No such key sequence';
      }
    }

    return sdata;
  }
  else {
    throw  'No such a service';
  }
}


function _paramsStringyfy(parms) {
  var str = '';
  for (var p in parms) {
    if (typeof parms[p] === 'object') {
      str = str + '|' + _paramsStringyfy(parms[p]) + '|';
    }
    else {
      str = str + (str != '' ? '_' : '') + p + '_' + parms[p];
    }
  }
  return str;
}

export default Mocker
