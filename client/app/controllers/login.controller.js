angular.module('myApp').controller('LoginController', function ($scope, $http, $location, UserService) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.login = function () {
    $http.post('http://localhost:5000/auth/login', $scope.user)
      .then(function (response) {
        $scope.error = ''
        let firstName = response.data.user.firstName
        let lastName = response.data.user.lastName
        let id = response.data.user._id
        UserService.setUser(firstName, lastName, id)
        console.log(firstName, lastName, id)
        console.log("Login successful, client side!")
        $scope.error = ''
        $location.path('/home');
      })
      .catch(function (error) {
        $scope.error = 'Invalid credentials'
        console.log("Failed login")
      })
  }
});