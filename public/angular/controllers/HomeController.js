angular.module('maqe-demo')
.controller('HomeController', ['$http', 'data', function($http, data) {

  var vm = this;

  /* Assign values */
  vm.posts = data.posts;
  vm.authors = data.authors.reduce(function(json, item) {
    json[item.id] = item;
    return json;
  }, {});

}]);