var util = require('util');
var fs = require('fs');
var spawn = require('child_process').spawn;

module.exports = function startCommand(config, args) {
    if (fs.existsSync(config['pidfile'])) {
        console.log("PID file exists ('" + config['pidfile'] + "')\nMaybe '" + config['APP_NAME'] + "' already running!?");
        return false;
    }

    var cleanupOnExit = function () {
        if (fs.existsSync(config['pidfile'])) {
            console.log("\nRemoving PID file ('" + config['pidfile'] + "')");
            fs.unlinkSync(config['pidfile']);
        }
    };

    var child;
    //args.unshift('start');
    args.unshift(config['APP_HOMEPATH']);
    child = spawn('node', args, {
        stdio: ['ignore', process.stdout, process.stderr],
        cwd: config['APP_HOMEPATH'],
        env: process.env
    });
    process.stdout.write("Started " + config['APP_NAME'] + " (pid: '" + child.pid + "')\n");

    process.on('SIGINT', cleanupOnExit);
    process.on('SIGQUIT', cleanupOnExit);
    process.on('SIGKILL', cleanupOnExit);

    fs.writeFileSync(config['pidfile'], child.pid);
    return true;
}
