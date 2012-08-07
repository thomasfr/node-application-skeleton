var fs = require('fs');
var commandsDir = __dirname + '/commands';
var util = require('util');

var commandName = process.argv[2];
try {
	var command = require('./commands/'+commandName);
	process.exit(command(process.argv.slice(3)));
} catch(e) {
	process.exit(2);
}
