'use strict';

angular.module('gAmPieApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tictactoe', {
        url: '/tictactoe',
        templateUrl: 'app/tictactoe/tictactoe.html',
        controller: 'TictactoeCtrl'
      });
  });
