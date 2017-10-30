var fs = require('fs'),
    https = require('https'),
    express = require('express'),
    commandLineArgs = require('command-line-args'),
    sockets = require('./signalmaster/sockets');

var app = express();
var port = 8080; //default
const options = commandLineArgs( { name: 'port', alias: 'p', type: Number })

if (options.port){port=options.port}
console.log("starting on port", port);

var config = {
	"isDev": false,
	"rooms": {
		"/* maxClients */": "/* maximum number of clients per room. 0 = no limit */",
		"maxClients": 0
	},
	"server": {
		"secure": true,
		"password": null
	},
	"stunservers": [
	{
		"urls": "stun:fake.pretendserver.dinosaurbutt:19302"
	}
	],
	"turnservers": [
	{
		"urls": ["turn:lies.turnsux.frenchfryvendor"],
		"secret": "turnserversharedsecret",
		"expiry": 86400
	}
	]
};

var server =  https.createServer({
	key: fs.readFileSync('private.key.pem'),
	cert: fs.readFileSync('domain.cert.pem')
}, app).listen(port);


sockets(server, config) // config is the same that server.js uses
app.use(express.static(__dirname + '/static'));