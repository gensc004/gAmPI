/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CustomDataInstance = require('./customDataInstance.model');

exports.register = function(socket) {
  CustomDataInstance.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  CustomDataInstance.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('customDataInstance:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('customDataInstance:remove', doc);
}