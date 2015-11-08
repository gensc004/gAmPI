'use strict';

angular.module('gAmPieApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('visualizeInstance', {
        url: '/visualize/:visCategory',
        templateUrl: 'app/visualize/visualize.html',
        controller: 'VisualizeCtrl'
      })
      .state('visualize', {
        url: '/visualize',
        templateUrl: 'app/visualize/visualize.html',
        controller: 'VisualizeCtrl'
      });
  });
