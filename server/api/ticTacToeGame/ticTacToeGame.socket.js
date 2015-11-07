/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var TicTacToeGame = require('./ticTacToeGame.model');

exports.register = function(socket) {
  TicTacToeGame.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  TicTacToeGame.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ticTacToeGame:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ticTacToeGame:remove', doc);
}