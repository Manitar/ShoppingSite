var app = angular.module("myApp", [
  "ngRoute",
  "angular-jwt",
  "angular-storage",
]);

// Config routes
app.config(function ($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "/app/views/login.html",
      controller: "LoginController",
    })
    .when("/register", {
      templateUrl: "/app/views/register.html",
      controller: "RegisterController",
    })
    .when("/home", {
      templateUrl: "/app/views/home.html",
      controller: "HomeController",
    })
    .when("/admin", {
      templateUrl: "/app/views/admin.html",
      controller: "AdminController",
    })
    .when("/product", {
      templateUrl: "/app/views/product.html",
      controller: "ProductController",
    })
    .otherwise({
      redirectTo: "/login",
    });
});

// Configure jwt options
app.config(function (jwtInterceptorProvider) {
  jwtInterceptorProvider.tokenGetter = function (store) {
    return store.get("jwt");
  };
});

app.constant("JWT_SECRET", "my-secret-key");

app.config(function (jwtOptionsProvider) {
  jwtOptionsProvider.config({
    secret: "my-secret-key",
    whiteListedDomains: ["http://localhost:8080"],
  });
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push("jwtInterceptor");
});
