class LoginCtrl {

  constructor(loginService, $location, $rootScope) {


    this.loginService = loginService;
    $rootScope.bodylayout = "boxed  login-behaviour";
  }

  login() {

    this.loginService.login()

  };

  logout() {
    this.loginService.logout()
  }
}

LoginCtrl.$inject = ['LoginService', '$location', '$rootScope'];
export default LoginCtrl
