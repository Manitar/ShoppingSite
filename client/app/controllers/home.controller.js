angular.module('myApp').controller('HomeController', function ($scope, $http, $q, UserService) {
  $scope.user = UserService.getUser();
  const userId = UserService.getUser().id
  function getProducts() {
    $http.get('http://localhost:5000/products/getProductList')
      .then(function (response) {
        var promises = response.data.map(function (product) {
          const productId = product._id;
          return $http.get(`http://localhost:5000/users/${userId}/cart/${productId}`)
            .then(function (response) {
              if (response.data === false) {
                return {
                  product: product,
                  text: "Add to Cart",
                  inCart: false,
                  quantity: 0
                };
              } else {
                return {
                  product: product,
                  text: "Remove from cart",
                  inCart: true,
                  quantity: 1
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

  $scope.cartClick = function (item) {
    const product = item.product
    const productId = product._id
    console.log("we're good")
    if (item.inCart === false) {
      $http.post(`http://localhost:5000/users/${userId}/cart/${productId}`, product)
        .then(function (response) {
          console.log(response)
          item.text = "Remove from cart"
          item.inCart = true
          item.quantity = 1
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    else {
      $http.delete(`http://localhost:5000/users/${userId}/cart/${productId}`, product)
        .then(function (response) {
          console.log(response)
          item.text = "Add to cart"
          item.inCart = false
          item.quantity = 0
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  getProducts();
});