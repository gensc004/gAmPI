/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CustomDataSchema = require('./customDataSchema.model');

exports.register = function(socket) {
  CustomDataSchema.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  CustomDataSchema.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('customDataSchema:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('customDataSchema:remove', doc);
}