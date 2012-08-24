var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

app.get('/', function(request, response) {
    response.end("<!DOCTYPE HTML>Hello World!");
});

server.listen(3000);
console.log('Listening on http://localhost:3000');