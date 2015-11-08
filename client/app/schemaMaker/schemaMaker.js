'use strict';

angular.module('gAmPieApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schemaMaker', {
        url: '/schemaMaker',
        templateUrl: 'app/schemaMaker/schemaMaker.html',
        controller: 'SchemaMakerCtrl'
      })
  });
