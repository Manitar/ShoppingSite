app.service("ProductService", function ($http) {
  var productId;

  this.setProduct = function (id) {
    productId = id;
  };

  this.getProduct = function (id) {
    return productId;
  };
});
