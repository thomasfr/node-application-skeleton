var fs = require('fs');
var commandsDir = __dirname + '/commands';
var util = require('util');
var underscore = require('underscore')
var commandName = process.argv[2];

if(!commandName) {
	// TODO: PRINT USAGE
	console.log("Usage: No command found.");
	process.exit(1);
}

var commandFile = __dirname + '/commands/' + commandName;
var command = require(commandFile);
var appConfig = {};
	
// If Config file is not there yet we just ignore it for the moment
// This should only be the case when 'install' command did not produced
// a valid json config file in 'APP_CONFFILE' 
try {
	appConfig = require(process.env['APP_CONFFILE']) || {};
} catch (e) {	}
	
var config = underscore.extend(appConfig, process.env);
var args = process.argv.slice(3) || [];
process.exit(command(config, args) || 0);
