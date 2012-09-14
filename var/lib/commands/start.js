var fs = require('fs');
var fork = require('child_process').fork;

module.exports = function startCommand(config, args) {
  if (fs.existsSync(config['pidfile'])) {
    console.log("PID file exists ('" + config['pidfile'] + "')");
    console.log("Maybe '" + config['APP_NAME'] + "' already running!?");
    return false;
  }

  fs.writeFileSync(config['pidfile'], process.pid, 'utf8');

  var cleanExit = function cleanExit() {
    if (fs.existsSync(config['pidfile'])) {
      console.log("\nRemoving PID file ('" + config['pidfile'] + "')");
      fs.unlinkSync(config['pidfile']);
    }
    process.exit();
  };

  process.on('SIGKILL', cleanExit);
  process.on('SIGTERM', cleanExit);
  process.on('SIGINT', cleanExit);

  process.chdir(config['APP_HOMEPATH']);

  try {
    var child = fork(config['APP_HOMEPATH'], [], {
      cwd: config['APP_HOMEPATH'],
      env: process.env
    });

  } catch (e) {
    console.error("Could not fork app.");
    throw new Error(e.getMessage());
  }

  return true;
}