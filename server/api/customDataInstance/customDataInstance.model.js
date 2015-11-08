'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var CustomDataInstanceSchema = new Schema({
  name: String,
  schemaId: ObjectIdSchema,
  dataPoints: Schema.Types.Mixed
});

CustomDataInstanceSchema.statics.query = function query(q) {
  var query = {};
  console.log(q.schemaId);
  if(q.schemaId) {
    query['schemaId'] = q.schemaId;
  }

  return this.find(query);
}

CustomDataInstanceSchema.pre('save', function(next) {
	this.markModified('dataPoints')
	next();
})

module.exports = mongoose.model('CustomDataInstance', CustomDataInstanceSchema);