/* 
Timestamp Microservice
Raymond Rizzo
*/

var http = require('http');
var express = require('express');
var url = require('url');
var app = express();
var moment = require('moment');

app.get('*', function(httpRequest, httpResponse){
	var timeObject = {'unix': 0, 'natural': 0};
	if(httpRequest.url.match(/[A-Z]{0,}[a-z]{0,}%20\d{1,2},%20\d{4}/)){	
		var naturalDate = httpRequest.url.match(/([A-Z]{0,}[a-z]{0,})%20(\d{1,2}),%20(\d{4})/);
		timeObject.unix = moment(naturalDate[1] + naturalDate[2] + naturalDate[3],'MMMMDYYYY')/1000;
		timeObject.natural = moment(timeObject.unix, 'X').format('MMMM D, YYYY');
		httpResponse.writeHead(200, { "Content-Type": "application/json" });
		httpResponse.end(JSON.stringify(timeObject));
	} else if(httpRequest.url.match(/\d{4,}/)) {
		var unixTime = httpRequest.url.match(/(\d{4,})/);
		timeObject.unix = unixTime[1];
		timeObject.natural = moment(timeObject.unix, 'X').format('MMMM D, YYYY');
		httpResponse.writeHead(200, { "Content-Type": "application/json" });
		httpResponse.end(JSON.stringify(timeObject));
	}
});

app.listen(process.env.PORT);