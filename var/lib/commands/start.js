var util = require('util');
var fs = require('fs');
var spawn = require('child_process').spawn;

module.exports = function startCommand (config, args) {
	if(fs.existsSync(config['pidfile'])) {
		console.log("pid file '" + config['pidfile'] + "' exists. App already running?");
		return 1;
	}
	process.stdout.write(" * Trying to start the application...");

	// It seems that we can use the same stream object for stdin and stdout. NOOO we can not!!
	// We have to create a second Stream to the same file, otherwise we will not get any
	// errors in the logfile and no error that it could not be written because the child is
	// detached from the parents. Yay.
	var out = fs.openSync(config['logfile'], 'a');
	var err = fs.openSync(config['logfile'], 'a');

	// Prepend the path to the actual path to the given arguments
	args.unshift(config['APP_HOMEPATH']);
	var child = spawn('node', args, {detached: true, stdio: ['ignore', out, err], cwd: config['APP_HOMEPATH']});
	child.unref();

	fs.writeFileSync(config['pidfile'], child.pid);
	process.stdout.write(" (pid: '" + child.pid + "') [ OK ]\n");
	return 0;
}
