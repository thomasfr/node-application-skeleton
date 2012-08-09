var fs = require('fs');
var Mustache = require('mustache');

var installCommand = module.exports = function installCommand (config, args) {
	var confDir = config['APP_CONF'];
	var files = fs.readdirSync(confDir);

	if(!files || files.length <= 0) {
		process.exit(1);
	}

	var fileContents;
	var fileOutput;
	var viewContext = {};
	var confFileName;
	
	// TODO: Populate viewContext from given config
	// and try to first populate 'app.json' and reload the config
	// object before populating all other config files found
	for(var env in process.env) {
	  viewContext[env] = process.env[env];
	}
	
	files.forEach(function(file) {
		if(file.search(/\.tpl$/) >= 0) {
			confFileName = confDir + '/' + file;
			console.log(" * Parsing '" + file + "'");
			fileContents = fs.readFileSync(confFileName, 'utf8');
			fileOutput = Mustache.to_html(fileContents, viewContext);
			fs.writeFileSync(confFileName.replace(/\.tpl$/,''), fileOutput, 'utf8');
		}
	});
	
	console.log(" * Done");
	return 0;
}
