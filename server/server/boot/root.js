'use strict';

module.exports = function(server) {
  // Install a `/` route that returns static files
  var router = server.loopback.Router();
  router.get('/');
  server.use(router);
};
