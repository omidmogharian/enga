import Bridge from 'bridge'
import WCookies from "wCookies"

class LoginService {
  constructor($rootScope, $location, $cookies,loginInfo) {
    this.$location = $location;
    this.loginInfo = loginInfo;
    this.$rootScope = $rootScope;
    this.$cookies = $cookies;
    this.bridge= new Bridge();
    LoginService.user = {};
  }

  login() {
    var params = this._getGoogleParams();
    var self = this;

    window.gapi.client.setApiKey(window.youtubeApiKey);
    window.gapi.auth.authorize(params, function(authResult) {

      if (authResult && !authResult.error) {
        let ac  = authResult.access_token;
        self._ssoGetUser(ac);
      }
    });
    return false;
  }

  logout() {
    window.gapi.auth.setToken(null);
    window.gapi.auth.signOut();
    console.log("You are signed out");
  }

  _ssoGetUser(access_token) {

    if (access_token) {

      WCookies.setItem('access_token',access_token,1);

      let self = this;

      this.bridge.login(access_token).then(function(d){
        var user = d["result"];
        WCookies.setItem('user', user,1);
        LoginService.user = user;
        self.$location.path(self.loginInfo.redirectTo);
        self.$rootScope.$$phase || self.$rootScope.$apply();

      },function(e){
        window.alert(JSON.parse( e.responseText).error.message)
        self.logout()
      });

    }

  }
  _getGoogleParams() {

    return {
      'client_id': this.loginInfo.client_id,
      'scope': 'email'
    }
  }
  getUser(redirect=true) {

    let access_token =  WCookies.getItem('access_token');
    if (!access_token && redirect) {
      this.$location.path(this.loginInfo.loginPage);
      this.$rootScope.$apply();
    }
    else {
      if (LoginService.user.hasOwnProperty('name')){
        return  LoginService.user;
      }
      else if (redirect){
        this.$location.path(this.loginInfo.loginPage);
        this.$rootScope.$apply();
      }

    }
    return {};
  }
}

LoginService.$inject = [ '$rootScope', '$location', '$cookies', 'loginInfo'];
export default LoginService
