var util = require('util');
var fs = require('fs');
var fork = require('child_process').fork;

module.exports = function(args) {
	console.log(args);
	var childProcess = fork(process.env['APP_MAIN']);
	console.log(childProcess);
}
