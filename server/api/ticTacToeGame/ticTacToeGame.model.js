'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
var TicTacToeGameSchema = new Schema({
  isActive: Boolean,
  game_id: Number,
  name: String,
  message: String,
  playerX: Schema.Types.Mixed,
  playerO: Schema.Types.Mixed,
  turn: String,
  values: [String],
  winner: String,
  timer: Number,
  countingDown: Boolean
});

TicTacToeGameSchema.statics.query = function query(q) {
	var query = {};
	if(q.gameId) {
		query['_id'] = q.gameId;
	};
	return this.find(query);
}

TicTacToeGameSchema.pre('save', function(next) {
  this.markModified('playerX');
  this.markModified('playerO');
  this.markModified('values');
  next();
})

module.exports = mongoose.model('TicTacToeGame', TicTacToeGameSchema);