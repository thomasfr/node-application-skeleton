var fs = require('fs');

var stopCommand = module.exports = function stopCommand (config, args) {
		if(!fs.existsSync(config.get('pidfile'))) {
			console.log("pid file '" + config.get('pidfile') + "' not found. App not running maybe?");
			return 1;
		}
    var pid = fs.readFileSync(config.get('pidfile'), 'utf8');
		if(pid) {
			process.stdout.write(" * Trying to stop process '" + pid + "'... ");
			if(process.kill(pid)) {
				process.stdout.write(" [ OK ]\n");
				fs.unlinkSync(config.get('pidfile'));
			} else {
				process.stdout.write(" [ FAIL ]\n");
			}
		}
		return 0;
}
