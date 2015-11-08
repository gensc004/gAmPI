'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
var TicTacToeGameSchema = new Schema({
  isActive: Boolean,
  name: Number,
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
		query['_id'] = q.gameId
	};
	return this.find(query);
}

module.exports = mongoose.model('TicTacToeGame', TicTacToeGameSchema);