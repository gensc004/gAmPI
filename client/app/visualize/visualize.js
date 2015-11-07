'use strict';

angular.module('gAmPieApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('visualize', {
        url: '/visualize/:visCategory',
        templateUrl: 'app/visualize/visualize.html',
        controller: 'VisualizeCtrl'
      });
  });
