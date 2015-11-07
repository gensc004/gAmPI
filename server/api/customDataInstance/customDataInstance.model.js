'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var CustomDataInstanceSchema = new Schema({
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

module.exports = mongoose.model('CustomDataInstance', CustomDataInstanceSchema);