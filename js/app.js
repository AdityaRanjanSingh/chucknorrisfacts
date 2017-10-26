var App = angular.module("App", ["ui.router"]);
App.controller("AppCtrl", ["$scope", "$state", "$log","chuckService", function($scope, $state, $log,chuckService) {
    $scope.init=function(){
        chuckService.getCategory.then(function(data){

        });
    }

}]);


App.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'AppCtrl'
    })

    // Each tab has its own nav history stack:

    // .state('notes', {
    //   url: '/notes:uid',
    //   templateUrl: 'templates/notes.html',

    //   controller:'notesCtrl'

    // });



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

});
App.service("chuckService",["$http", "$q",function($http,$q){

    this.getCategory = function($scope){
         var request = $http({
                        method: "get",
                        url: "https://api.chucknorris.io/jokes/random",
                    });

         return( request.then( handleSuccess, handleError ) );
        // $http.get("https://api.chucknorris.io/jokes/random").then(function(response){

        // })
        // .fail(function(response){

        // })
    }

    function handleError( response ) {
        if (! angular.isObject( response.data ) ||  ! response.data.message) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        return( $q.reject( response.data.message ) );
    }

    function handleSuccess( response ) {
        return( response.data );
    }
}]);