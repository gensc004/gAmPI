'use strict';

var _ = require('lodash');
var CustomDataSchema = require('./customDataSchema.model');

// Get list of customDataSchemas
exports.index = function(req, res) {
  CustomDataSchema.find(function (err, customDataSchemas) {
    if(err) { return handleError(res, err); }
    return res.json(200, customDataSchemas);
  });
};

// Get a single customDataSchema
exports.show = function(req, res) {
  CustomDataSchema.findById(req.params.id, function (err, customDataSchema) {
    if(err) { return handleError(res, err); }
    if(!customDataSchema) { return res.send(404); }
    return res.json(customDataSchema);
  });
};

// Creates a new customDataSchema in the DB.
exports.create = function(req, res) {
  CustomDataSchema.create(req.body, function(err, customDataSchema) {
    if(err) { return handleError(res, err); }
    return res.json(201, customDataSchema);
  });
};

// Updates an existing customDataSchema in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CustomDataSchema.findById(req.params.id, function (err, customDataSchema) {
    if (err) { return handleError(res, err); }
    if(!customDataSchema) { return res.send(404); }
    var updated = _.merge(customDataSchema, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, customDataSchema);
    });
  });
};

// Deletes a customDataSchema from the DB.
exports.destroy = function(req, res) {
  CustomDataSchema.findById(req.params.id, function (err, customDataSchema) {
    if(err) { return handleError(res, err); }
    if(!customDataSchema) { return res.send(404); }
    customDataSchema.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}