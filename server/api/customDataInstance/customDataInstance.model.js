'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var CustomDataInstanceSchema = new Schema({
  schemaId: ObjectIdSchema,
  data: Schema.Types.Mixed
});

module.exports = mongoose.model('CustomDataInstance', CustomDataInstanceSchema);