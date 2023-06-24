app.service('AuthService', function ($http, store, jwtHelper) {
  this.login = function ({ email, password }) {
    return $http.post(`http://localhost:5000/auth/login`, { email, password })
      .then(function (response) {
        var token = response.data.token;
        store.set('jwt', token);
        return response.data;
      })
      .catch(function (error) {
        console.log(error)
      })
  };

  this.logout = function () {
    store.remove('jwt');
    user = {}
  };

  this.getUser = function () {
    token = store.get('jwt')
    var decodedToken = jwtHelper.decodeToken(token);
    var { firstName, lastName, id, isAdmin } = decodedToken
    user = { firstName, lastName, id, isAdmin };
    return user
  }

  // this.isAuthenticated = function () {
  //   var token = store.get('jwt');
  //   if (!token) {
  //     return Promise.resolve(false);
  //   }

  //   return $http.post("http://localhost:5000/auth/validate", { token })
  //     .then(function (response) {
  //       return true
  //     })
  //     .catch(function (error) {
  //       console.error('Authentication error:', error);
  //       return false;
  //     });
  // };

  this.isAuthenticated = function () {
    var token = store.get('jwt');
    if (!token) {
      return false
    }
    return token && !jwtHelper.isTokenExpired(token);
  };

});