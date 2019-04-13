const express = require('express');
const app = express();
const router = express.Router();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

app.use('/', router);
app.use(bodyParser.urlencoded({
	extended: true
}));

let port = process.env.PORT || 8080;
http.listen(port);

app.get('/', function(req, res) {
	let pin = req.query.pin;
	let state = req.query.state;

	if (pin && state)
		io.sockets.emit('action', {pin: pin, state: state});

	res.sendFile(path.join(__dirname+'/blank.html'));
});

io.on('connection', function (socket) {
	console.log('client connected');

	socket.on('disconnect', function () {
		console.log('client disconnected');
	});
});