var fs = require('fs');

var stopCommand = module.exports = function stopCommand(config, args) {
    if (!fs.existsSync(config['pidfile'])) {
        console.log("PID file exists ('" + config['pidfile'] + "')\nMaybe '" + config['APP_NAME'] + "' is not running at the moment?");
        return false;
    }
    var pid = fs.readFileSync(config['pidfile'], 'utf8');
    if (pid) {
        process.stdout.write("Stopping '" + config['APP_NAME'] + "' ('" + pid + "')");
        fs.unlinkSync(config['pidfile']);
        if (process.kill(pid)) {
            process.stdout.write(" [ OK ]\n");
        } else {
            process.stdout.write(" [ FAIL ]\n");
        }
    }
    return true;
}