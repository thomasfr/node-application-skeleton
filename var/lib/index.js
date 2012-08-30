var underscore = require('underscore');
var simpleReplace = require('simple-replace')
var fs = require('fs')
var commandName = process.argv[2];
var appConfig = {};

if (!commandName) {
  // TODO: PRINT USAGE
  console.log("Usage: No command found.");
  process.exit(1);
}

var getApplicationConfig = function (configHash) {
  var confFilePath = process.env['APP_CONFFILE']
  var fileContents = fs.readFileSync(confFilePath, 'utf8')
  var fileOutput = simpleReplace(fileContents, configHash)
  try {
    var appConfig = JSON.parse(fileOutput)
  } catch (e) {}
  return appConfig
}

var appConfig = getApplicationConfig(process.env)
var commandsDir = __dirname + '/commands'
var config = underscore.extend(appConfig, process.env)
var args = process.argv.slice(3) || []

if (commandName !== 'configure') {
  var configureCommand = require(commandsDir + '/' + 'configure')
  configureCommand(config, args)
}

try {
  var command = require(commandsDir + '/' + commandName)
} catch (e) {
  console.error("Command '" + commandName + "' not found or failed to load.")
  throw new Error(e.getMessage())
}
command(config, args);