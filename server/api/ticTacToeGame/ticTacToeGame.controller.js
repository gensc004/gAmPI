'use strict';

var _ = require('lodash');
var TicTacToeGame = require('./ticTacToeGame.model');

// Get list of ticTacToeGames
exports.index = function(req, res) {
  TicTacToeGame.find(function (err, ticTacToeGames) {
    if(err) { return handleError(res, err); }
    return res.json(200, ticTacToeGames);
  });
};

// Get a single ticTacToeGame
exports.show = function(req, res) {
  TicTacToeGame.findById(req.params.id, function (err, ticTacToeGame) {
    if(err) { return handleError(res, err); }
    if(!ticTacToeGame) { return res.send(404); }
    return res.json(ticTacToeGame);
  });
};

// Creates a new ticTacToeGame in the DB.
exports.create = function(req, res) {
  TicTacToeGame.create(req.body, function(err, ticTacToeGame) {
    if(err) { return handleError(res, err); }
    return res.json(201, ticTacToeGame);
  });
};

// Updates an existing ticTacToeGame in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TicTacToeGame.findById(req.params.id, function (err, ticTacToeGame) {
    if (err) { return handleError(res, err); }
    if(!ticTacToeGame) { return res.send(404); }
    var updated = _.merge(ticTacToeGame, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, ticTacToeGame);
    });
  });
};

// Deletes a ticTacToeGame from the DB.
exports.destroy = function(req, res) {
  TicTacToeGame.findById(req.params.id, function (err, ticTacToeGame) {
    if(err) { return handleError(res, err); }
    if(!ticTacToeGame) { return res.send(404); }
    ticTacToeGame.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}