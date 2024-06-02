const express = require('express');
const crypto = require('crypto');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const io_client = require("socket.io-client");
var  server = "http://localhost:3000";
var port_obs = 3001;
var password = "";
var html_file = "obs.html";
const debug = process.env.DEBUG || 0;

const fs = require('fs');
const path = require('path');


function log(value, text) {
	if (debug > 0 && (debug & value) != 0) {
		console.log(text);
    }
}

// if you supply a json file, you can set
// your own parameters
if (process.argv.length > 2) {
	var obj = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
	log(2, obj);
	if (obj.server != null) {
		server = obj.server;
	}

	if (obj.port_obs != null) {
		port_obs = obj.port_obs.toString();
	}

	if (obj.password != null) {
		password = obj.password.toString();
	}

	if (obj.html_file != null) {
		html_file = obj.html_file.toString();
	}
}


let names = [
	'leftName',
	'rightName',
	'leftScore',
	'rightScore',
	'period',
	'gameClock'
];

let hash = crypto.createHash('sha256').update(password).digest('hex')
hash = hash.toUpperCase();

// the last message for each key
let keyValues = {};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/' + html_file);
});

io.on('connection', (socket) => {
	log(1, "A user connected");

	for (var key in keyValues) {
		socket.emit(key, keyValues[key]);
	}

});


http.listen(port_obs, () => {
	console.log(`Socket.IO server running at http://localhost:${port_obs}/`);
});


const socket_client = io_client.connect(server);

names.forEach(function (name) {
	socket_client.on(name, msg => {
		var obj = JSON.parse(msg)
		if (obj.hash == hash) {
			keyValues[name] = msg;
			io.emit(name, msg);
		}
	});
});


