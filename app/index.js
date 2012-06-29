
console.log("ENV VARIABLES:");
for(var env in process.env) {
	console.log(env + ": ", process.env[env]);
}

console.log("\n\nCONFIGURATION:");
console.log("node executable: ", process.execPath);
console.log("node version: ", process.version);
console.log("Current Working Dir: ", process.cwd());
console.log("node config: ", process.config);

console.log("\n\nARGUMENTS:");
process.argv.forEach(function (val, index, array) {
	console.log(index + ': ' + val);
});

var http = require('http');
http.createServer(function(request, response) {
	response.write("Hello Boilerplate App", 'utf8');
	console.log("request");
	response.end();
}).listen(8000);
console.log("Listening on http://127.0.0.1:8000 ");
