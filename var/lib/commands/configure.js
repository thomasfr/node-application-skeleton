var fs = require('fs');
var simpleReplace = require('simple-replace');

var configure = module.exports = function configureCommand(config, args) {
  var confDir = config['APP_CONFPATH'];
  var files = fs.readdirSync(confDir);

  if (!files || files.length <= 0) {
    return false;
  }

  var processFile = function processFile(fileName) {
    if (fileName.search(filePatternRegex) >= 0) {
      confFileName = confDir + '/' + fileName;
      newConfFileName = confFileName.replace(filePatternRegex, "");
      console.log("Processing config file ('" + newConfFileName + "')");
      fileContents = fs.readFileSync(confFileName, 'utf8');
      fileOutput = simpleReplace(fileContents, configHash);
      fs.writeFileSync(newConfFileName, fileOutput, 'utf8');
    }
  };

  var fileContents;
  var fileOutput;
  var filePatternRegex = /\.tpl$/;
  var confFileName;
  var newConfFileName;
  var configHash = process.env;

  files.forEach(processFile);
  return true;
};