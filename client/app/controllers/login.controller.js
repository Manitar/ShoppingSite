angular.module('myApp').controller('LoginController', function ($scope, $location, AuthService) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.login = function () {
    AuthService.login($scope.user)
      .then(function (response) {
        console.log("Login successful, client side!");
        $location.path('/home');
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  function checkAuth() {
    if (AuthService.isAuthenticated()) {
      $location.path('/home');
    }
  }
  checkAuth();
});