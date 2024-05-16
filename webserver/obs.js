const express = require('express');
const crypto = require('crypto');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const io_client = require("socket.io-client");
const port = process.env.PORT || 3000;
const port_obs = (Number(port) + 1).toString();
const debug = process.env.DEBUG || 0;

const fs = require('fs');
const path = require('path');
// to be fixed later
//import { getKeys } from './public/scripts/functions'

function log(value, text) {
	if (debug > 0 && (debug & value) != 0) {
		console.log(text);
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

// the last message for each key
let keyValues = {};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/obs.html');
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


const server = "http://localhost:" + port;
const socket_client = io_client.connect(server);

names.forEach(function (name) {
	socket_client.on(name, msg => {
		keyValues[name] = msg;
		io.emit(name, msg);
	});
});


