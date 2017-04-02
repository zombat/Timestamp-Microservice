/* 
Timestamp Microservice
Raymond Rizzo
*/

var http = require('http');
var express = require('express');
var app = express();

app.get('/hello', function(httpRequest, httpResponse){
	httpResponse.writeHead(200, {'Content-Type': 'text/html'});
	httpResponse.end('<h1>Hello World!</h1>');
		});

app.listen(8080);