
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

process.exit(0);
