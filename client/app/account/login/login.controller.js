'use strict';

angular.module('gAmPieApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $stateParams) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          if($stateParams.next) {
            $location.path('/' + $stateParams.next);
          }else{
            $location.path('/');
          }
          
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
