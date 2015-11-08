'use strict';

angular.module('gAmPieApp')
  .controller('TictactoeCtrl', function ($scope, socket, $http, Auth) {
  	$scope.currentUser = Auth.getCurrentUser();
  	console.log($scope.currentUser);
  	$scope.player = 'X';
  	$scope.countingDown = false;
  	$scope.message="";



    $scope.interval = setInterval(function(){
        if ($scope.timeRemaining > 0 && $scope.countingDown) 
        {
        	$scope.timeRemaining--;
        	$scope.$apply();
        }

    }, 1000);

    $scope.joinGame = function(game) {
    	$scope.currentGame = game;
    	$scope.values = $scope.currentGame.values;
    	console.log($scope.currentGame.playerX);
    	if ($scope.currentGame.playerX)
    	{
    		console.log("there is already a player 1, adding player 2...")
    		$scope.timeRemaining = 60;
    		$scope.countingDown = true;
    		$scope.player = 'O';
    		$scope.currentGame.isActive = true;
    		$scope.currentGame.playerO = $scope.currentUser;
    	}
    	//we might not need this later
    	else 
    	{
    		console.log("there is no players, adding player 1...")
    		$scope.timeRemaining = 60;
    		$scope.countingDown = false;
    		$scope.player = 'X';
    		$scope.currentGame.playerX = $scope.currentUser;
    		console.log("Player 1: " + $scope.currentGame.playerX._id);
    	}
    	$http.put('/api/ticTacToeGame/' + $scope.currentGame._id, $scope.currentGame).success(function(success) {
    		console.log(success)
    	});
    }
    $http.get('/api/ticTacToeGame').success(function(success) {
    	$scope.games = success.payload;
    	socket.syncUpdates('ticTacToeGame', $scope.games, function(event, item, array) {
    		if ($scope.currentGame._id == item._id)
 	   			$scope.currentGame=item;
    		
    	});
    });

    $scope.claimSquare = function(index) {
    	if($scope.currentGame.turn == $scope.player) {
    		$scope.currentGame.values[index] = $scope.player;
    		if($scope.player == 'X') {
    			$scope.currentGame.turn = 'O'
    		} else {
    			$scope.currentGame.turn = 'X'
    		}
    		$scope.timeRemaining = 60;
	    	$http.put('/api/ticTacToeGame/' + $scope.currentGame._id, $scope.currentGame);
    	}
    }

    $scope.createGame = function() {
    	var newGame = {
    		isActive: false,
    		playerX: $scope.currentUser,
    		playerO: null,
    		turn: 'X',
    		values: ['_', '_', '_', '_', '_', '_', '_', '_', '_']
    	};
    	$scope.message = "Waiting for second player...";
    	$http.post('/api/ticTacToeGame', newGame).success(function(success) {
    		$scope.currentGame = success.payload;
    		console.log($scope.currentGame);
    	})
    }

    $scope.exitGame = function() {
    	$scope.countingDown = false;
    	$scope.currentGame = null;
    }
    $scope.opponentLeft = function() {
    	$scope.currentGame = null;
    }

    $scope.filterFn = function(game)
  	{
  		return !game.playerO;
  	}
  });
