'use strict';

var _ = require('lodash');
var CustomDataInstance = require('./customDataInstance.model');

// Get list of customDataInstances
exports.index = function(req, res) {
  CustomDataInstance.find(function (err, customDataInstances) {
    if(err) { return handleError(res, err); }
    return res.json(200, customDataInstances);
  });
};

// Get a single customDataInstance
exports.show = function(req, res) {
  CustomDataInstance.findById(req.params.id, function (err, customDataInstance) {
    if(err) { return handleError(res, err); }
    if(!customDataInstance) { return res.send(404); }
    return res.json(customDataInstance);
  });
};

// Creates a new customDataInstance in the DB.
exports.create = function(req, res) {
  CustomDataInstance.create(req.body, function(err, customDataInstance) {
    if(err) { return handleError(res, err); }
    return res.json(201, customDataInstance);
  });
};

// Updates an existing customDataInstance in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CustomDataInstance.findById(req.params.id, function (err, customDataInstance) {
    if (err) { return handleError(res, err); }
    if(!customDataInstance) { return res.send(404); }
    var updated = _.merge(customDataInstance, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, customDataInstance);
    });
  });
};

// Deletes a customDataInstance from the DB.
exports.destroy = function(req, res) {
  CustomDataInstance.findById(req.params.id, function (err, customDataInstance) {
    if(err) { return handleError(res, err); }
    if(!customDataInstance) { return res.send(404); }
    customDataInstance.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}