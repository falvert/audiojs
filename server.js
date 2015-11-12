var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');

// socket.io instance
var sio = require('socket.io')(http);

// route to home page 
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// connection event
sio.on('connection', function(socket){

	// open file to stream
	fs.readFile(__dirname + '/sample.mp3', function(err, buf){

		// send data to browser
		socket.emit('audio file', {audio: true, audioBuffer: buf} );
	});
	
});

http.listen(3000, function() {
	console.log('listening on port *:3000');
});
