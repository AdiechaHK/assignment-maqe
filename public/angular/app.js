angular.module('maqe-demo', [
  'ui.router',
  'oc.lazyLoad'
])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    
    .state('home', {
        url: '/home',
        controller: 'HomeController',
        controllerAs: 'vm',
        templateUrl: 'public/angular/views/home.html',
        resolve: {
          deps: function($ocLazyLoad) {
            return $ocLazyLoad.load('public/angular/controllers/HomeController.js');
          },
          data: function($q, $http) {

            var posts = $http.get("index.php/api/posts")
                .then(function(res){ return {status:true, 'posts': res.data}; }, 
                    function(){ console.log("Error."); });

            var authors = $http.get("index.php/api/authors")
                .then(function(res){ return {status:true, 'authors': res.data}; }, 
                    function(){ console.log("Error."); });

            return $q.all([posts, authors]).then(function(res) {
                return res.reduce(function(json, item) {
                    json.status = json.status && item.status;
                    return angular.extend(json, item);
                }, {status: true});
            });

          }

        }
    });
})

.filter('dateAgo', function() {
  return function(ipDate) {
    var date = new Date(Date.parse(ipDate));
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);
    if (interval == 1) return interval + " year ago";
    if (interval > 1) return interval + " years ago";
    interval = Math.floor(seconds / 2592000);
    if (interval == 1) return interval + " month ago";
    if (interval > 1) return interval + " months ago";
    interval = Math.floor(seconds / 604800);
    if (interval == 1) return interval + " week ago";
    if (interval > 1) return interval + " weeks ago";
    interval = Math.floor(seconds / 86400);
    if (interval == 1) return interval + " day ago";
    if (interval > 1) return interval + " days ago";
    interval = Math.floor(seconds / 3600);
    if (interval == 1) return interval + " hour ago";
    if (interval > 1) return interval + " hours ago";
    interval = Math.floor(seconds / 60);
    if (interval == 1) return interval + " minute ago";
    if (interval > 1) return interval + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  }
})


