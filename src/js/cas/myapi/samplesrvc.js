
class sampleSrvc {


  static login(accessToken) {
    this.server.accessToken = accessToken;
    return this.server.call( "login",{"accessToken":accessToken})

  }

  static hasPermission(accessToken) {
    this.server.accessToken = accessToken;
    return this.server.call( "has_permission",{"accessToken":accessToken});

  }

  static getAllContact() {
    return this.server.call( "get_all_contact",{});

  }
}

export default sampleSrvc
