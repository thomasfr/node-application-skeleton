var fs = require('fs');
var simpleReplace = require('simple-replace');

var configure = module.exports = function (config, args) {
    var confDir = config['APP_CONFPATH'];
    var files = fs.readdirSync(confDir);

    if (!files || files.length <= 0) {
        process.exit(1);
    }

    var fileContents;
    var fileOutput;
    var configHash = {};
    var confFileName;
    var newConfFileName;

    // TODO: Populate configHash from given config
    // and try to first populate 'app.json' and reload the config
    // object before populating all other config files found
    for (var env in process.env) {
        configHash[env] = process.env[env];
    }

    files.forEach(function (file) {
        if (file.search(/^tpl\..*/) >= 0) {
            confFileName    = confDir + '/' + file;
            newConfFileName = confFileName.replace(/\.tpl$/, '');
            console.log("Preparing config file ('" + newConfFileName + "')");
            fileContents    = fs.readFileSync(confFileName, 'utf8');
            fileOutput      = simpleReplace(fileContents, configHash);
            fs.writeFileSync(newConfFileName, fileOutput, 'utf8');
        }
    });
    return true;
};