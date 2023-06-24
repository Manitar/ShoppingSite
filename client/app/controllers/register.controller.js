angular.module('myApp').controller('RegisterController', function ($scope, $http, $location) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.register = function () {
    $http.post('http://localhost:5000/auth/register', $scope.user)
      .then(function (response) {
        $scope.error = ''
        console.log("Register successful, client side!")
        $location.path('/login');
      })
      .catch(function (error) {
        console.log("Failed register")
      })
  }
});