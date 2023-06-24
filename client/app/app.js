
angular.module('myApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: '/app/views/login.html',
        controller: 'LoginController'
      })
      .when('/register', {
        templateUrl: '/app/views/register.html',
        controller: 'RegisterController'
      })
      .when('/home', {
        templateUrl: '/app/views/home.html',
        controller: 'HomeController'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });


