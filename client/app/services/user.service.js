
angular.module('myApp').service('UserService', function () {
  var user = {};

  this.setUser = function (firstName, lastName, id) {
    user.firstName = firstName;
    user.lastName = lastName
    user.id = id
  }

  this.getUser = function () {
    return user;
  }
})