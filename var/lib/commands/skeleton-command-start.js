var fs = require('fs')
var spawn = require('child_process').spawn

module.exports = function startCommand(config, args) {
  if (fs.existsSync(config['pidfile'])) {
    console.log("PID file exists ('" + config['pidfile'] + "')");
    console.log("Maybe '" + config['APP_NAME'] + "' already running!?")
    return false
  }

  var cleanupOnExit = function c() {
    if (fs.existsSync(config['pidfile'])) {
      console.log("\nRemoving PID file ('" + config['pidfile'] + "')")
      fs.unlinkSync(config['pidfile'])
    }
  }

  //args.unshift('start');
  args.unshift(config['APP_HOMEPATH'])
  var child = spawn('node', args, {
    stdio: ['ignore', process.stdout, process.stderr],
    cwd: config['APP_HOMEPATH'],
    env: process.env
  })
  console.log("Started " + config['APP_NAME'] + " (pid: '" + child.pid + "')")

  process.on('SIGINT', cleanupOnExit)
  process.on('SIGQUIT', cleanupOnExit)
  process.on('SIGKILL', cleanupOnExit)

  fs.writeFileSync(config['pidfile'], child.pid)
  return true
}