'use strict';

var KinnectedAppControllers = angular.module('KinnectedControllers',['KinnectedServices']);


angular.module('KinnectedApp').controller('IndexController',
  ['$scope', '$state', 'AuthService','Flash',
  function ($scope, $state, AuthService,Flash) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.email, $scope.loginForm.password)
        // handle success
        .then(function () {
          $state.go('profile.home');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          var message = 'Invalid Username or Password bro :)';
          console.log("testing");
          Flash.create('danger', message);
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);


angular.module('KinnectedApp').controller('profileSearchController',
  ['$scope', '$state', 'AuthService','$http','Flash',
  function ($scope, $state, AuthService,$http,Flash) {
      var getpeople = function(){
        $http({
          url:'/api/users/all',
          method:'GET',})
        .success(function(data){
          $scope.users = data.data;
          console.log($scope.users);
        })
        .error(function(data){
          console.log("messed up for the search");
        })
      }
  }]);

angular.module('KinnectedApp').controller('profileController',
  ['$scope', '$state', 'AuthService','$http','Flash',
  function ($scope, $state, AuthService,$http,Flash) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $state.go('home');
        });

    };
    var firstTime = function () {
        var message = '<strong>Welcome!</strong> Fill in your profile information and get that job!.';
        Flash.create('info', message);
    };

    $scope.updateProfile = function(){
      $http({
        url:'/api/users/update',
        method:'GET',
        params:$scope.userData})
        .success(function(data,status){
          console.log("successful update");
          $state.go('profile.home');
        })
        .error(function(data){
          console.log("failed update");
        })
    }

    var init = function(){
       AuthService.getUserData().then(function(data){
          $scope.userData = data.data;

          //have a filler if they havn't updated their profile yet
          if($scope.userData.major == null){
            $scope.userData.major = "Fill in your major!";
          }
          if($scope.userData.gradyear == null){
            $scope.userData.gradyear = "Fill in your Grad Year!";
          }
       })
    }
    firstTime()
    init()


}]);



angular.module('KinnectedApp').controller('logoutController',
  ['$scope', '$state', 'AuthService',
  function ($scope, $state, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $state.go('home');
        });

    };

}]);

angular.module('KinnectedApp').controller('registerController',
  ['$scope', '$location', 'AuthService','$state',
  function ($scope, $location, AuthService,$state) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.first_name,
                           $scope.registerForm.last_name,
                           $scope.registerForm.email,
                           $scope.registerForm.password)
        // handle success
        .then(function () {
          $scope.disabled = false;
          $scope.registerForm = {};
          $state.go('profile.home');
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);