'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TicTacToeGameSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('TicTacToeGame', TicTacToeGameSchema);