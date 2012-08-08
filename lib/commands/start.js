var util = require('util');
var fs = require('fs');
var spawn = require('child_process').spawn;

var startCommand = module.exports = function startCommand (config, args) {
	if(args.length <= 0) {
		var out = fs.openSync(config.get('logfile'), 'a');
		var child = spawn(process.env['APP_NODE'], [process.env['APP_MAIN']], {detached: true, stdio: ['ignore', out, out]});
		child.unref();
		console.log("child process", util.inspect(child, false, null, true));
	}
	return 0;
}
