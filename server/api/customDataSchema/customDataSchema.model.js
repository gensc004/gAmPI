'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

var CustomDataSchemaSchema = new Schema({
  name: String,
  userId: ObjectIdSchema,
  schemaId: {type:ObjectIdSchema, 
  	default: function () 
  	{
  	 return new ObjectId()
  	} 
  },
  dataSchema: Schema.Types.Mixed,
  visualizationSchema: Schema.Types.Mixed
});

module.exports = mongoose.model('CustomDataSchema', CustomDataSchemaSchema);