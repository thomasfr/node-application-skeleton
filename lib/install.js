var fs = require('fs');
var Mustache = require('mustache');
var confDir = process.env['APP_CONF'];
var files = fs.readdirSync(confDir);

if(!files || files.length <= 0) {
	process.exit(1);
}

var fileContents;
var fileOutput;
var viewContext = {};
var confFileName;

for(var env in process.env) {
  viewContext[env] = process.env[env];
}

files.forEach(function(file) {
	if(-1 === file.search(/\.(orig|bak)$/)) {
		confFileName = confDir + '/' + file;
		console.log(" * Parsing '" + file + "'");
		fileContents = fs.readFileSync(confFileName, 'utf8');
		fs.writeFileSync(confDir + '/' + file + '.orig', fileContents, 'utf8');
		fileOutput = Mustache.to_html(fileContents, viewContext);
		fs.writeFileSync(confFileName, fileOutput, 'utf8');
	}
});

console.log(" * Done");
process.exit(0);
