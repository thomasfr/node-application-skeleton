var util = require('util');
var fs = require('fs');
var spawn = require('child_process').spawn;
var out = fs.openSync(process.env['APP_LOG'] + '/out.log', 'a');
var err = fs.openSync(process.env['APP_LOG'] + '/err.log', 'a');


module.exports = function() {
	console.log("arguments", arguments);
	var child = spawn(process.env['APP_BIN'] + '/app', ['node', process.env['APP_MAIN']], {detached: true, stdio: ['ignore', out, err]});
	child.unref();
	console.log("child process", util.inspect(child, false, null, true));
	return 0;
}
