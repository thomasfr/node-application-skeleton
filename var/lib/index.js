var underscore = require('underscore');
var commandName = process.argv[2];
var appConfig = {};

if (!commandName) {
    // TODO: PRINT USAGE
    console.log("Usage: No command found.");
    process.exit(1);
}

// If Config file is not there yet we just ignore it for the moment
// This should only be the case when 'configure' command did not produced
// a valid json config file in 'APP_CONFFILE' 
try {
    appConfig = require(process.env['APP_CONFFILE']) || {};
} catch (e) {}

var config = underscore.extend(appConfig, process.env);
var args = process.argv.slice(3) || [];

if(commandName !== 'configure') {
    require('skeleton-command-configure')(config, args);
}

var commandFile = 'skeleton-command-' + commandName;
var command = require(commandFile);

process.exit(command(config, args) || 0);