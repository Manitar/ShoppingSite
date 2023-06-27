angular
  .module("myApp")
  .controller(
    "ProductController",
    function ($scope, $http, $location, AuthService, ProductService) {
      function showProduct() {
        $scope.productId = ProductService.getProduct();
        $http
          .get(`http://localhost:5000/products/getProduct/${$scope.productId}`)
          .then(function (response) {
            console.log(response.data);
            $scope.product = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      $scope.backHome = function () {
        $location.path("/home");
      };

      $scope.editPrice = function () {
        //
        $http
          .patch(
            `http://localhost:5000/products/editPrice/${$scope.productId}`,
            { newPrice: $scope.price }
          )
          .then(function (response) {
            console.log("Price changed successfully!");
            $scope.product.price = $scope.price;
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      showProduct();
    }
  );
