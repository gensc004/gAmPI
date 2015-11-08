'use strict';

angular.module('gAmPieApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customDataSchemas', {
        url: '/customDataSchemas',
        templateUrl: 'app/customDataSchemas/customDataSchemas.html',
        controller: 'CustomDataSchemasCtrl'
      })
  });
