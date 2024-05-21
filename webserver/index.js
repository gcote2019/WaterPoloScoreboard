const express = require('express');
const crypto = require('crypto');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var port = 3000;
const debug = process.env.DEBUG || 0;
var password = "";

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
	if (obj.port != null) {
		port = obj.port.toString();
	}

	if (obj.password != null) {
		password = obj.password.toString();
	}
}

log(2, `port:${port}`);
log(2, `password:${password}`);


let names = [
	'leftName',
	'rightName',
	'leftScore',
	'rightScore',
	'period',
	'gameClock',
	'shotClock',
	'leftTimeOut',
	'rightTimeOut',
	'colors',
	'messages'
];

let messages = [];

for (let i = 1; i <= 20; i++) {
	names.push('leftKickOutNumber' + i.toString());
	names.push('rightKickOutNumber' + i.toString());
}
for (i = 1; i <= 3; i++) {
	names.push('leftPenaltyNumber' + i.toString());
	names.push('rightPenaltyNumber' + i.toString());
	names.push('leftPenaltyTime' + i.toString());
	names.push('rightPenaltyTime' + i.toString());
}


let hash = crypto.createHash('sha256').update(password).digest('hex')
hash = hash.toUpperCase();


// the last message for each key
let keyValues = {};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	log(1, "A user connected");
	names.forEach(function (name) {
		log(2, name);
		socket.on(name, msg => {
			var obj = JSON.parse(msg)
			log(2, obj);
			if (obj.hash == hash) {
				log(1, name);
				log(1, msg);
				if (name == 'messages') {
					messages.push(msg);
					if (messages.length > 50) {
						messages.shift();
					}
				}
				else
				{
					keyValues[name] = msg;
				}
				io.emit(name, msg);
				log(2, "emitted");
			}
		});

	});

	for (var key in keyValues) {
		socket.emit(key, keyValues[key]);
	}
	messages.forEach((currentValue) => {socket.emit('messages', currentValue); })
});

http.listen(port, () => {
	console.log(`Socket.IO server running at http://localhost:${port}/`);
});
