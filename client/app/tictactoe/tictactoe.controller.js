'use strict';

angular.module('gAmPieApp')
  .controller('TictactoeCtrl', function ($scope, socket, $http, Auth, $interval) {
  	if (!Auth.isLoggedIn()){
  		window.location.href = '/login';
  	}
  	$scope.currentUser = Auth.getCurrentUser();
  	console.log($scope.currentUser);
  	$scope.player = 'X';
  	$scope.countingDown = false;

    

    $scope.joinGame = function(game) {
    	$scope.currentGame = game;
    	$scope.values = $scope.currentGame.values;
    	console.log($scope.currentGame.playerX);
    	if ($scope.currentGame.playerX && !$scope.currentGame.playerO)
    	{
    		$scope.currentGame.message = "It is player 1's turn";
    		console.log("there is already a player 1, adding player 2...");
    		$scope.resetTimer($scope.currentGame);
    		$scope.currentGame.countingDown = true;
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
    		$scope.resetTimer($scope.currentGame);
    		$scope.currentGame.countingDown = false;
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
    		if ($scope.currentGame)
    			$scope.initializeInterval();
    			
    		if ($scope.openGames($scope.games) == 0) {
  				$scope.lobbyMessage = "There are no games with open spots. Start a new one!"
    		}
    		else {
    			$scope.lobbyMessage = "Click on a game to join it!"
    		}
    		if ($scope.currentGame._id == item._id) {
 	   			$scope.currentGame=item;
    		}
    	});
    });

    $scope.initializeInterval = function() {
    	$scope.countdown = $interval($scope.updateTime, 1000); 
    }

    $scope.updateTime = function() {
    	if ($scope.currentGame) {
    		if ($scope.currentGame.countingDown) {
    		   	if ($scope.currentGame.timer > 0) 
    		   	{
    		   		$scope.currentGame.timer--;
    		   	}
    		   	else if ($scope.currentGame.timer < 1)
  			   	{
  			   		$scope.randomMove();
        		}
    		}
    	}
    }

    $scope.claimSquare = function(index) {
    	if($scope.currentGame.isActive && $scope.currentGame.turn == $scope.player && $scope.currentGame.values[index] == '_') {
    		$scope.currentGame.values[index] = $scope.player;
    		console.log("Checking: " + $scope.player + ", " + index + ", " + $scope.currentGame.values);
    		if ($scope.hasWon($scope.player, index, $scope.currentGame.values)) {
    			$scope.currentGame.countingDown = false;
    			$interval.cancel($scope.countdown);
    			$scope.currentGame.isActive = false;
    			if ($scope.player == 'X') {
    				$scope.currentGame.message = $scope.currentGame.playerX.name + " wins!";
    				console.log($scope.currentGame.playerX.name)
    				console.log($scope.currentGame.playerO.name)
    				$scope.updateStats($scope.currentGame.playerX.name, $scope.currentGame.playerO.name);
    			}
    			else {
    				$scope.currentGame.message = $scope.currentGame.playerO.name + " wins!";
    				console.log($scope.currentGame.playerX.name)
    				console.log($scope.currentGame.playerO.name)
    				$scope.updateStats($scope.currentGame.playerO.name, $scope.currentGame.playerX.name);
    			}
    		}
    		else if($scope.boardFull($scope.currentGame.values)) {
    			$scope.currentGame.countingDown = false;
    			$interval.cancel($scope.countdown);
    			$scope.currentGame.isActive = false;
    			$scope.currentGame.message = "Cat's game!";
    		}
    		else if($scope.player == 'X') {
    			$scope.currentGame.turn = 'O'
    			$scope.currentGame.message = "It is player 2's turn";
    		} 
    		else {
    			$scope.currentGame.turn = 'X'
    			$scope.currentGame.message = "It is player 1's turn";
    		}
    		$scope.resetTimer($scope.currentGame);
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
    	$scope.currentGame.countingDown = false;
    	console.log("PLAYERS(1): " + $scope.player + " " + $scope.currentGame.playerX + " " + $scope.currentGame.playerY);
    	if ($scope.player == 'X')
	    	$scope.currentGame.playerX = null; 
	    else
	    	$scope.currentGame.playerY = null;

	    if (!$scope.currentGame.playerX && !$scope.currentGame.playerY) {
    		console.log("PLAYERS(2): " + $scope.currentGame.playerX + " " + $scope.currentGame.playerY);
	    	$http.delete('api/ticTacToeGame/' + $scope.currentGame._id);
	    }
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

  	$scope.randomMove = function()
  	{
  		var move = Math.floor(Math.random() * 9);
  	  	while($scope.currentGame.values[move] != '_')
       	{
        	move = Math.floor(Math.random() * 9);
        }
        $scope.claimSquare(move);
  	}

  	$scope.resetTimer = function(currentGame)
  	{
  		currentGame.timer = 60;
  	}

  	$scope.updateStats = function(winner, loser) 
  	{
  		$http.get('/api/customDataInstance/563ed3a7d0606e8165900c14').success(function(success) {
  			var data = success.payload.dataPoints;
  			var foundWinner = false;
  			var foundLoser = false;
  			for (var i = 0; i < data.length; i++)
  			{
  				console.log(data[i].Player)
  				console.log(winner)
  				console.log(data[i])
  				if (data[i].Player == winner && !foundWinner) {
  					console.log('WE FOUND A WINNER')
  					data[i].Wins++;
  					foundWinner = true;
  				}
  				else if (data[i].Player == loser && !foundLoser) {
  					data[i].Losses++;
  					foundLoser = true;
  				
  				}
  			}
  			if (!foundWinner) {
  				data.push([{"Player": winner, "Wins": 1, "Losses": 0}]);
  			
  			}
  			if (!foundLoser) {
  				data.push([{"Player": loser, "Wins": 0, "Losses": 1}]);
  				
  			}
  			$http.put('/api/customDataInstance/563ed3a7d0606e8165900c14', {schemaId: success.payload.schemaId, dataPoints: data}).success(function(success)
  			{
  				console.log(success);
  			})

  			
  		})
  	}

  	$scope.boardFull = function(board)
  	{
  		for (var i = 0; i < board.length; i++)
  		{
  			if (board[i] == "_") 
  			{
  				return false;
  			}
  		}
  		return true;
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
