'use strict';

angular.module('gAmPieApp')
  .controller('TictactoeCtrl', function ($scope, socket, $http, Auth) {
  	if (!Auth.isLoggedIn()){
  		window.location.href = '/login';
  	}
  	$scope.currentUser = Auth.getCurrentUser();
  	console.log($scope.currentUser);
  	$scope.player = 'X';
  	$scope.countingDown = false;

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
    	if ($scope.currentGame.playerX && !$scope.currentGame.playerO)
    	{
    		$scope.currentGame.message = "It is player 1's turn";
    		console.log("there is already a player 1, adding player 2...");
    		$scope.timeRemaining = 60;
    		$scope.countingDown = true;
    		$scope.player = 'O';
    		$scope.currentGame.isActive = true;
    		$scope.currentGame.playerO = $scope.currentUser;
    	}
    	//else if ($scope.currentGame.playerO)
    	//{
    	//	console.log('oops')
    	//	alert("Can't join game! Already two players");
    	//}
    	//we might not need this later
    	else if (!$scope.currentGame.playerO)
    	{
    		console.log("there are no players, adding player 1...")
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
    	if ($scope.openGames($scope.games) == 0) {
  			$scope.lobbyMessage = "There are no games with open spots. Start a new one!"
    	}
    	else {
    		$scope.lobbyMessage = "Click on a game to join it!"
    	}
    	socket.syncUpdates('ticTacToeGame', $scope.games, function(event, item, array) {
    		
    		if ($scope.openGames($scope.games) == 0) {
  				$scope.lobbyMessage = "There are no games with open spots. Start a new one!"
    		}
    		else {
    			$scope.lobbyMessage = "Click on a game to join it!"
    		}
    		if ($scope.currentGame._id == item._id)
 	   			$scope.currentGame=item;
    		
    	});
    });

    $scope.claimSquare = function(index) {
    	if($scope.currentGame.isActive && $scope.currentGame.turn == $scope.player && $scope.currentGame.values[index] == '_') {
    		$scope.currentGame.values[index] = $scope.player;
    		console.log("Checking: " + $scope.player + ", " + index + ", " + $scope.currentGame.values);
    		if ($scope.hasWon($scope.player, index, $scope.currentGame.values)) {
    			$scope.currentGame.message = $scope.player + " wins!"
    			$scope.currentGame.isActive = false;
    		}
    		else if($scope.player == 'X') {
    			$scope.currentGame.turn = 'O'
    			$scope.currentGame.message = "It is player 2's turn";
    		} 
    		else {
    			$scope.currentGame.turn = 'X'
    			$scope.currentGame.message = "It is player 1's turn";
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
    		values: ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
    		name: $scope.getName(),
    		message: "Waiting for second player..."
    	};
    	$http.post('/api/ticTacToeGame', newGame).success(function(success) {
    		$scope.currentGame = success.payload;
    		console.log($scope.currentGame);
    	})
    }

    $scope.exitGame = function() {
    	$scope.countingDown = false;
    	console.log("PLAYERS(1): " + $scope.player + " " + $scope.currentGame.playerX + " " + $scope.currentGame.playerY);
    	if ($scope.player == 'X')
	    	$scope.currentGame.playerX == null; 
	    else
	    	$scope.currentGame.playerY == null;
    	console.log("PLAYERS(2): " + $scope.currentGame.playerX + " " + $scope.currentGame.playerY);
    	$scope.currentGame = null;
    }
    $scope.opponentLeft = function() {
    	$scope.currentGame = null;
    }

    $scope.filterFn = function(game)
  	{
  		return !game.playerO;
  	}

  	$scope.getName = function()
  	{
  		if($scope.games.length < 1) {
  			return 1;
  		}
  		else {
  			return $scope.games[$scope.games.length - 1].name + 1;
  		}
  	}

  	$scope.openGames = function(games)
  	{
  		var gameCount = 0;
  		for (var i = 0; i < games.length; i++)
  		{
  			if (!games[i].playerO || !games[i].playerX) {
  				gameCount++;
  			}
  		}
  		return gameCount;
  	}

  	$scope.hasWon = function(player, move, board)
  	{
  		console.log(player + ", " + move + ", " + board);
  		if (move == 0) {
  			if (board[1] == player && board[2] == player) {
  				return true;
  			}
  			else if (board[3] == player && board[6] == player) {
  				return true;
  			}
  			else if (board[4] == player && board[8] == player) {
  				return true;
  			}
  		}
  		else if (move == 1) {
  			if (board[0] == player && board[2] == player) {
  				return true;
  			}
  			else if (board[4] == player && board[7] == player) {
  				return true;
  			}
  		}
  		else if (move == 2) {
  			if (board[0] == player && board[1] == player) {
  				return true;
  			}
  			else if (board[4] == player && board[6] == player) {
  				return true;
  			}
  			else if (board[5] == player && board[8] == player) {
  				return true;
  			}
  		}
  		else if (move == 3) {
  			if (board[4] == player && board[5] == player) {
  				return true;
  			}
  			else if (board[0] == player && board[6] == player) {
  				return true;
  			}
  		}
  		else if (move == 4) {
  			if (board[0] == player && board[8] == player) {
  				return true;
  			}
  			else if (board[1] == player && board[7] == player) {
  				return true;
  			}
  			else if (board[2] == player && board[6] == player) {
  				return true;
  			}
  			else if (board[5] == player && board[3] == player) {
  				return true;
  			}
  		}
  		else if (move == 5) {
  			if (board[2] == player && board[8] == player) {
  				return true;
  			}
  			else if (board[3] == player && board[4] == player) {
  				return true;
  			}
  		}
  		else if (move == 6) {
  			if (board[0] == player && board[3] == player) {
  				return true;
  			}
  			else if (board[7] == player && board[8] == player) {
  				return true;
  			}
  		}
  		else if (move == 7) {
  			if (board[1] == player && board[4] == player) {
  				return true;
  			}
  			else if (board[6] == player && board[8] == player) {
  				return true;
  			}
  		}
  		else if (move == 8) {
  			if (board[0] == player && board[4] == player) {
  				return true;
  			}
  			else if (board[6] == player && board[7] == player) {
  				return true;
  			}
  			else if (board[2] == player && board[5] == player) {
  				return true;
  			}
  		}
  		return false;
  	}
  });
