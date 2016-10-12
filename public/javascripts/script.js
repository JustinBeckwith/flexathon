var socket = io.connect();

socket.on('error', function(err) {
  console.log("Error!");
  console.log(err);
});

socket.on('connect', function(data) {
  console.log('in connect!');
  socket.emit('join', 'Hello World from client');
});

socket.on('engine', function(data) {
  console.log('getting engine...');
  console.log(data);
  alert('engine');
});

var btn = document.getElementById('ping');
btn.onclick = function() {
  console.log('sending app...');
  socket.emit('app', 'here is an app');
}

