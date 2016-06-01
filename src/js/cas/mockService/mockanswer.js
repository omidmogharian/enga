

class MockAnswer {

  constructor(data){
    this.data = {};
    this.data["result"] = data;
  }
  done(fulfill){
    return fulfill(this.data);
  }
  fail(reject) {
    return reject("err");
  }
  then(fulfill,reject){
    let self= this;
    return fulfill(self.data)
    //setTimeout(function(){r);},5000)
  }

}

export default MockAnswer;
