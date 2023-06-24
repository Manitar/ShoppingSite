angular.module('myApp').controller('RegisterController', function ($scope, $http, $location, AuthService) {
  $scope.user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: ''
  };

  $scope.register = function () {
    if ($scope.user.isAdmin === 'admin') {
      $scope.user.isAdmin = true
    }
    else {
      $scope.user.isAdmin = false
    }
    $http.post('http://localhost:5000/auth/register', $scope.user)
      .then(function (response) {
        $scope.error = ''
        console.log("Register successful, client side!")
        $location.path('/login');
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function checkAuth() {
    if (AuthService.isAuthenticated()) {
      $location.path('/home');
    }
  }
  checkAuth();
});