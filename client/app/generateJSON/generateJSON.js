'use strict';

angular.module('gAmPieApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('generateJSON', {
        url: '/generateJSON/:genCategory',
        templateUrl: 'app/generateJSON/generateJSON.html',
        controller: 'GenerateJSONCtrl'
      });
  });
