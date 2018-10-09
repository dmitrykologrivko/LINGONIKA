'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var minimist = require('minimist');

var CommandRunner = require('./utils/managment/CommandRunner');

var app = module.exports = loopback();
var commandRunner = new CommandRunner(app, minimist(process.argv.slice(2)));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    app.log.info('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      app.log.info('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  // and commands runner has no any commands to handle
  if (require.main === module) {
    if (!commandRunner.shouldRunCommand()) {
      return app.start();
    }

    commandRunner.runCommand()
      .then(() => {})
      .catch(e => {app.log.error(e)});
  }
});
