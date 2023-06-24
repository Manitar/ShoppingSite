angular.module('myApp').controller('AdminController', function ($scope, $http, $q, $location, AuthService) {
  $scope.item = ''
  $scope.addProduct = function () {
    $http.post(`http://localhost:5000/products/addProduct`, { productName: $scope.item })
      .then(function (response) {
        $scope.item = ''
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  $scope.logout = function () {
    AuthService.logout()
    $location.path('/login');
  }

  $scope.homePage = function () {
    $location.path('/home')
  }


  function checkAuth() {
    if (!AuthService.isAuthenticated()) {
      $location.path('/login');
    }
    else {
      $scope.user = AuthService.getUser();
      userId = AuthService.getUser().id;
      if (!$scope.user.isAdmin) {
        $location.path('/login');
      }
    }
  }

  checkAuth();
});