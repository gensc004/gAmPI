'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;
var CustomDataSchema = require('../customDataSchema/customDataSchema.model');

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

CustomDataInstanceSchema.pre('save', function(next) {
	var self = this
	var query = {
		schemaId: this.schemaId
	}
	CustomDataSchema.findOne(query).exec(function(err, schema) {
		console.log(schema);
		var conformsToSchema = true;
		for(var i = 0; i < schema.dataSchema.length; i++) {
			if(!self.dataPoints[0].hasOwnProperty(schema.dataSchema[i].field)) {
				conformsToSchema = false;
			}
		}
		if(conformsToSchema) {
			next();
		} else {
			next(new Error("Improper dataPoints for schema"));
		}
		
	})
	
})

module.exports = mongoose.model('CustomDataInstance', CustomDataInstanceSchema);