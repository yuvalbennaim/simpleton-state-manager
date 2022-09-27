var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var port = 3003;

app.use('/@', express.static(path.join(__dirname, '../node_modules')));
app.use('/', express.static(path.join(__dirname, '../client'))); //configure static resources base path
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('./router'));

app.listen(port, () => {
    console.log(`Running http://localhost:${port}`);    
});

process.on('uncaughtException', (err) => {
	if(err.errno === 'EADDRINUSE')
		console.log("uncaughtException EADDRINUSE");
	else {
		console.log(err);
	}
	
	process.exit(1);
});