angular
  .module("myApp")
  .controller(
    "HomeController",
    function ($scope, $http, $q, $location, AuthService, ProductService) {
      $scope.query = "";
      var userId;

      $scope.search = function () {
        if ($scope.query === "") {
          getProducts();
          return;
        }
        $http
          .get(`http://localhost:5000/products/search/${$scope.query}`)
          .then(function (response) {
            var promises = response.data.map(function (product) {
              const productId = product._id;
              return $http
                .get(`http://localhost:5000/users/${userId}/cart/${productId}`)
                .then(function (response) {
                  if (response.data === false) {
                    return {
                      product: product,
                      text: "Add to Cart",
                      inCart: false,
                      quantity: 0,
                    };
                  } else {
                    return {
                      product: product,
                      text: "Remove from cart",
                      inCart: true,
                      quantity: response.data.quantity,
                    };
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            });

            // Resolve all promises
            return $q.all(promises);
          })
          .then(function (modifiedData) {
            $scope.items = modifiedData;
            $scope.error = "";
          })
          .catch(function (error) {
            $scope.error = error;
          });
      };

      function getProducts() {
        $http
          .get("http://localhost:5000/products/getProductList")
          .then(function (response) {
            var promises = response.data.map(function (product) {
              const productId = product._id;
              return $http
                .get(`http://localhost:5000/users/${userId}/cart/${productId}`)
                .then(function (response) {
                  if (response.data === false) {
                    return {
                      product: product,
                      text: "Add to Cart",
                      inCart: false,
                      quantity: 0,
                    };
                  } else {
                    return {
                      product: product,
                      text: "Remove from cart",
                      inCart: true,
                      quantity: response.data.quantity,
                    };
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            });

            // Resolve all promises
            return $q.all(promises);
          })
          .then(function (modifiedData) {
            $scope.items = modifiedData;
            $scope.error = "";
          })
          .catch(function (error) {
            $scope.error = error;
          });
      }

      $scope.changeQuantity = function (item, change) {
        const product = item.product;
        const productId = product._id;
        $http
          .patch(
            `http://localhost:5000/users/${userId}/cart/${change}/${productId}`
          )
          .then(function (response) {
            item.quantity =
              response.data.newUser.cart[productId.toString()].quantity;
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      $scope.itemClicked = function (item) {
        ProductService.setProduct(item.product._id);
        $location.path("/product");
      };
      $scope.cartClick = function (item) {
        const product = item.product;
        const productId = product._id;
        if (item.inCart === false) {
          $http
            .post(
              `http://localhost:5000/users/${userId}/cart/${productId}`,
              product
            )
            .then(function (response) {
              item.text = "Remove from cart";
              item.inCart = true;
              item.quantity = 1;
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          $http
            .delete(
              `http://localhost:5000/users/${userId}/cart/${productId}`,
              product
            )
            .then(function (response) {
              item.text = "Add to cart";
              item.inCart = false;
              item.quantity = 0;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      };

      $scope.purchaseItems = function () {
        //router.post("/:userId/purchase", purchaseItems)
        $http
          .post(`http://localhost:5000/users/${userId}/purchase`)
          .then(function (response) {
            getProducts();
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      $scope.logout = function () {
        AuthService.logout();
        $location.path("/login");
      };

      $scope.adminPanel = function () {
        $location.path("/admin");
      };

      // function checkAuth() {
      //   AuthService.isAuthenticated()
      //     .then(function (isAuth) {
      //       if (!isAuth) {
      //         $location.path('/login');
      //       } else {
      //         $scope.user = AuthService.getUser();
      //         userId = AuthService.getUser().id;
      //       }
      //     })
      //     .catch(function (error) {
      //       console.error('Authentication error:', error);
      //       $location.path('/login');
      //     });
      // }

      function checkAuth() {
        if (!AuthService.isAuthenticated()) {
          $location.path("/login");
        } else {
          $scope.user = AuthService.getUser();
          userId = AuthService.getUser().id;
          getProducts();
        }
      }
      checkAuth();
    }
  );
