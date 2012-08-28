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
} catch (e) {
  console.log("No config file found '" + process.env['APP_CONFFILE'] + "'");
}

var commandsDir = __dirname + '/commands/';
var config = underscore.extend(appConfig, process.env);
var args = process.argv.slice(3) || [];

// if(commandName !== 'configure') {
//     require(commandsDir + 'skeleton-command-configure.js')(config, args);
// }
var commandFile = 'skeleton-command-' + commandName;
try {
  var command = require(commandsDir + commandFile + '.js');
} catch (e) {
  console.error("Command '" + commandName + "' not found or failed to load.");
  throw new Error(e.getMessage());
}
command(config, args);