var fs = require('fs');
var commandsDir = __dirname + '/commands';
var util = require('util');
var underscore = require('underscore')
var commandName = process.argv[2];

try {
	var command = require('./commands/'+commandName);
	var appConfig = {};
	
	// If Config file is not there yet we just ignore it for the moment
	// This should only be the case when 'install' command did not produced
	// a valid json config file in 'APP_CONFFILE' 
	try {
		appConfig = require(process.env['APP_CONFFILE']);
	} catch (e) {	}

	var config = underscore.extend(appConfig, process.env);
	var args = process.argv.slice(3) || [];
	process.exit(command(config, args) || 0);
} catch(e) {
	process.exit(2);
}
