/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var mers = require('mers');
var mongoose = require('mongoose');
var auth = require('./auth/auth.service');

module.exports = function(app) {
  console.log(auth.isAuthenticated())
  // Insert routes below
  app.use('/api/customDataInstances', require('./api/customDataInstance'));
  app.use('/api/customDataSchemas',auth.isAuthenticated(), require('./api/customDataSchema'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  //app.all('/api/*', auth.isAuthenticated());
  app.use('/api', mers({
    mongoose: mongoose
  }).rest())
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
