// # Ghost Startup
// Orchestrates the startup of Ghost when run from command line.
var express,
    ghost,
    parentApp,
    errors;

// Make sure dependencies are installed and file system permissions are correct.
require('./core/server/utils/startup-check').check();

// Proceed with startup
express = require('express');
ghost = require('./core');
errors = require('./core/server/errors');

if (false) {
	var app = express();
	app.get('/', function (req, res) {
	  res.end('It Works!! Path Hit: ' + req.url);
	});
	var host = (process.env.VCAP_APP_HOST || 'localhost');
	var port = (process.env.VCAP_APP_PORT || 2368);
	app.listen(port, host);
	return;
}

// Create our parent express app instance.
parentApp = express();

// Call Ghost to get an instance of GhostServer
ghost().then(function (ghostServer) {

	parentApp.get('/', function (req, res) {
	  res.end('It Works!! Path Hit 2: ' + req.url);
	});
	var host = (process.env.VCAP_APP_HOST || 'localhost');
	var port = (process.env.VCAP_APP_PORT || 2368);
	parentApp.listen(ghostServer.config.server.port, ghostServer.config.server.host);
	return;

    // Mount our Ghost instance on our desired subdirectory path if it exists.
    parentApp.use(ghostServer.config.paths.subdir, ghostServer.rootApp);

    // Let Ghost handle starting our server instance.
    ghostServer.start(parentApp);
}).catch(function (err) {
    errors.logErrorAndExit(err, err.context, err.help);
});
