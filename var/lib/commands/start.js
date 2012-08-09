var util = require('util');
var fs = require('fs');
var spawn = require('child_process').spawn;

var startCommand = module.exports = function startCommand (config, args) {
	if(args.length <= 0) {
		if(fs.existsSync(config.get('pidfile'))) {
			console.log("pid file '" + config.get('pidfile') + "' exists. App already running?");
			return 1;
		}
		process.stdout.write(" * Trying to start the application...");
		var out = fs.openSync(config.get('logfile'), 'a');
		var child = spawn(config.get('APP_NODE'), [config.get('APP_MAIN')], {detached: true, stdio: ['ignore', out, out]});
		child.unref();
		fs.writeFileSync(config.get('pidfile'), child.pid);
		process.stdout.write(" (pid: '" + child.pid + "') [ OK ]\n");
	} else {
		// TODO: If args is set (when called e.g.: 'bin/app start redis' or 'bin/app start mongo' or whatever )
		// try to start the command. Maybe implement sub-commands
	}
	return 0;
}
