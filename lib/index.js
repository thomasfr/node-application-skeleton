var fs = require('fs');
var commandsDir = __dirname + '/commands';
var util = require('util');

console.log("argv:");
console.log(util.inspect(process.argv, false, null, true));

var commandName = process.argv[2];
try {
	var command = require('./commands/'+commandName);
	console.log("command found");
	command(process.argv.slice(3));
} catch(e) {
	process.exit(2);
}
