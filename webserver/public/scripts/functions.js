function update(obj, element) {
	try {
		element.innerHTML = obj.value;
	} catch (error) {
	}
}

function receive(socket, key, element) {
	socket.on(key, function (msg) {
		console.log(key + msg);
		var obj = JSON.parse(msg)
		if (key === 'messages') {
			if (messages.length > 0) {
				messages = obj.value + '<br><br>' + messages;
			} else {
				messages = obj.value;
            }

			try {
				element.innerHTML = messages;
			} catch (error) {
			}
		} else {
			update(obj, element);
		}

	});
}
let keyValues = {};

let counter = 1;
let messages = "";

function increment() {
	counter++;
}
function create_kickouts(name, left) {
	var element = document.getElementById(name);
	var div = document.createElement('div');
	div.innerHTML = left ? counter.toString() : '0';
	if (!left) {
		div.setAttribute('id', 'rightKickOutNumber' + counter.toString()); // and make sure myclass has some styles in css
	}
	element.appendChild(div);
	var div = document.createElement('div');
	div.innerHTML = left ? "0" : counter.toString();
	if (left) {
		div.setAttribute('id', 'leftKickOutNumber' + counter.toString()); // and make sure myclass has some styles in css
	}
  element.appendChild(div);
}

function do_scoreboard() {
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
		'messages'	
	];

	for (let i = 1; i <= 20; i++) {
		names.push("leftKickOutNumber" + i.toString());
		names.push("rightKickOutNumber" + i.toString());
	}
	for (i = 1; i <= 3; i++) {
		names.push("leftPenaltyNumber" + i.toString());
		names.push("leftPenaltyTime" + i.toString());
		names.push("rightPenaltyNumber" + i.toString());
		names.push("rightPenaltyTime" + i.toString());
	}

	let socket = io();
	for (i = 0; i < names.length; i++) {
		let name = names[i];
		keyValues[name] = document.getElementById(name);
	}

	for (var key in keyValues) {
		var value = keyValues[key];
		if (value != null) {
			receive(socket, key, value);
		}
	}
}
